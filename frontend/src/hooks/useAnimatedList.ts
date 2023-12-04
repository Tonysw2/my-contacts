import { createRef, useCallback, useEffect, useRef, useState } from 'react'

import { ToastDTO } from '../dtos/ToastDTO'

type RenderItemType<T> = (
  item: any,
  {
    isLeaving,
    animatedRef,
  }: {
    isLeaving: boolean
    animatedRef: React.MutableRefObject<T | null>
  },
) => JSX.Element

export function useAnimatedList<TItem>() {
  const [items, setItems] = useState<ToastDTO[]>([])
  const [pendingRemovalItemsIds, setPendingRemovalItemIds] = useState<string[]>(
    [],
  )

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleRemoveItem = useCallback((id: string) => {
    setPendingRemovalItemIds((state) => [...state, id])
  }, [])

  const handleAnimationEnd = useCallback((itemId: string) => {
    const removeListener = animationEndListeners.current.get(itemId)
    removeListener()

    animationEndListeners.current.delete(itemId)
    animatedRefs.current.delete(itemId)

    setItems((state) => state.filter((message) => message.id !== itemId))
    setPendingRemovalItemIds((state) => state.filter((id) => id !== itemId))
  }, [])

  const getAnimatedRef = useCallback((itemId: string) => {
    let animatedRef = animatedRefs.current.get(itemId)

    if (!animatedRef) {
      animatedRef = createRef()
      animatedRefs.current.set(itemId, animatedRef)
    }

    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem: RenderItemType<TItem>) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id)
        const animatedRef = getAnimatedRef(item.id)

        return renderItem(item, { isLeaving, animatedRef })
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef],
  )

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const alreadyHasListener = animationEndListeners.current.has(itemId)

      if (animatedRef?.current && !alreadyHasListener) {
        function onAnimationEnd() {
          handleAnimationEnd(itemId)
        }
        function removeListener() {
          animatedRef.current.removeEventListener(
            'animationend',
            onAnimationEnd,
          )
        }

        animatedRef.current.addEventListener('animationend', onAnimationEnd)
        animationEndListeners.current.set(itemId, removeListener)
      }
    })
  }, [pendingRemovalItemsIds, handleAnimationEnd])

  useEffect(() => {
    return () => {
      animationEndListeners.current.forEach((removeListeners) =>
        removeListeners(),
      )
    }
  }, [])

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  }
}
