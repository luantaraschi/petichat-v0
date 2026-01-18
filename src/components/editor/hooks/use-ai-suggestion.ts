import { useState, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import { toast } from 'sonner'
import { AiActionType } from '../ai-suggestion-popup'

interface UseAiSuggestionOptions {
    editor: Editor | null
    pieceId?: string
    onSave?: (contentJson: unknown) => void
}

interface AiSuggestionState {
    isOpen: boolean
    isLoading: boolean
    originalText: string
    suggestedText: string
    actionType: AiActionType
    suggestionId: string | null
    position: { top: number; left: number } | null
    selectionRange: { from: number; to: number } | null
}

const initialState: AiSuggestionState = {
    isOpen: false,
    isLoading: false,
    originalText: '',
    suggestedText: '',
    actionType: 'rewrite',
    suggestionId: null,
    position: null,
    selectionRange: null,
}

export function useAiSuggestion({ editor, pieceId, onSave }: UseAiSuggestionOptions) {
    const [state, setState] = useState<AiSuggestionState>(initialState)

    const requestSuggestion = useCallback(async (actionType: AiActionType) => {
        if (!editor) return

        const selection = editor.state.selection
        if (selection.empty) {
            toast.error("Selecione um texto para usar a IA")
            return
        }

        const originalText = editor.state.doc.textBetween(selection.from, selection.to)
        const coords = editor.view.coordsAtPos(selection.from)

        setState({
            isOpen: true,
            isLoading: true,
            originalText,
            suggestedText: '',
            actionType,
            suggestionId: null,
            position: { top: coords.top + window.scrollY, left: coords.left + window.scrollX },
            selectionRange: { from: selection.from, to: selection.to },
        })

        try {
            const response = await fetch('/api/ai/suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pieceId: pieceId || 'demo',
                    actionType,
                    selectionFrom: selection.from,
                    selectionTo: selection.to,
                    originalText,
                }),
            })

            if (!response.ok) throw new Error('Failed to generate suggestion')

            const suggestionId = response.headers.get('X-Suggestion-Id')
            if (suggestionId) {
                setState(prev => ({ ...prev, suggestionId }))
            }

            if (!response.body) return
            const reader = response.body.getReader()
            let fullText = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = new TextDecoder().decode(value)
                fullText += chunk
                setState(prev => ({ ...prev, suggestedText: fullText }))
            }
        } catch (error) {
            console.error('AI suggestion error:', error)
            toast.error('Erro ao gerar sugestão')
            setState(initialState)
        } finally {
            setState(prev => ({ ...prev, isLoading: false }))
        }
    }, [editor, pieceId])

    const acceptSuggestion = useCallback(async () => {
        if (!editor || !state.suggestedText || !state.selectionRange) return

        try {
            editor
                .chain()
                .focus()
                .setTextSelection(state.selectionRange)
                .deleteSelection()
                .insertContent(state.suggestedText)
                .run()

            if (state.suggestionId) {
                await fetch(`/api/suggestions/${state.suggestionId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        status: 'accepted',
                        suggestedText: state.suggestedText,
                    }),
                })
            }

            toast.success('Sugestão aplicada!')
            setState(initialState)
            onSave?.(editor.getJSON())
        } catch (error) {
            console.error('Error accepting suggestion:', error)
            toast.error('Erro ao aplicar sugestão')
        }
    }, [editor, state, onSave])

    const rejectSuggestion = useCallback(async () => {
        if (state.suggestionId) {
            try {
                await fetch(`/api/suggestions/${state.suggestionId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        status: 'rejected',
                        suggestedText: state.suggestedText
                    }),
                })
            } catch (error) {
                console.error('Error rejecting suggestion:', error)
            }
        }

        setState(initialState)
        editor?.commands.focus()
    }, [editor, state.suggestionId, state.suggestedText])

    const regenerateSuggestion = useCallback(() => {
        if (state.actionType) {
            requestSuggestion(state.actionType)
        }
    }, [state.actionType, requestSuggestion])

    return {
        isOpen: state.isOpen,
        isLoading: state.isLoading,
        originalText: state.originalText,
        suggestedText: state.suggestedText,
        actionType: state.actionType,
        suggestionId: state.suggestionId,
        position: state.position,
        requestSuggestion,
        acceptSuggestion,
        rejectSuggestion,
        regenerateSuggestion,
    }
}
