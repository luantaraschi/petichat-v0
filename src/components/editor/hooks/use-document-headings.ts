import { useState, useEffect, useCallback, RefObject } from 'react'
import { Editor } from '@tiptap/react'

export interface Heading {
    id: string
    text: string
    level: number
}

interface UseDocumentHeadingsOptions {
    editor: Editor | null
    scrollContainerRef: RefObject<HTMLDivElement | null>
}

function extractHeadings(editor: Editor | null): Heading[] {
    if (!editor) return []
    const headings: Heading[] = []
    let index = 0

    editor.state.doc.descendants((node) => {
        if (node.type.name === 'heading') {
            headings.push({
                id: `heading-${index}`,
                text: node.textContent,
                level: node.attrs.level
            })
            index++
        }
    })
    return headings
}

export function useDocumentHeadings({ editor, scrollContainerRef }: UseDocumentHeadingsOptions) {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null)

    // Extract headings on editor changes
    useEffect(() => {
        if (!editor) return

        const updateHeadings = () => {
            setHeadings(extractHeadings(editor))
        }

        updateHeadings()

        editor.on('update', updateHeadings)
        return () => {
            editor.off('update', updateHeadings)
        }
    }, [editor])

    // Track active heading with IntersectionObserver
    useEffect(() => {
        if (!editor) return

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-heading-index')
                    if (idx !== null) {
                        setActiveHeadingId(`heading-${idx}`)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, {
            root: scrollContainerRef.current,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        })

        const timeout = setTimeout(() => {
            const domHeadings = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6')
            domHeadings.forEach((el, idx) => {
                el.setAttribute('data-heading-index', String(idx))
                observer.observe(el)
            })
        }, 100)

        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [editor, headings, scrollContainerRef])

    const scrollToHeading = useCallback((id: string) => {
        if (!editor) return
        const index = parseInt(id.split('-')[1])
        if (isNaN(index)) return

        const domHeadings = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const target = domHeadings[index]

        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [editor])

    return {
        headings,
        activeHeadingId,
        scrollToHeading,
    }
}
