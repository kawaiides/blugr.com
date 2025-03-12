'use client'

import { useEffect, useState, useRef } from 'react'
import Anser from 'anser'

export default function LogStream() {
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  
  useEffect(() => {
    const eventSource = new EventSource('/api/logs')

    eventSource.onmessage = (event) => {
      setLogs(prev => {
        const newLogs = [...prev, event.data]
        return newLogs.slice(-200) // Keep last 200 lines
      })
    }

    eventSource.onerror = (err) => {
      setError('Connection to log stream failed')
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])
  // Scroll handler
  const checkAutoScroll = () => {
    if (!containerRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50
    setAutoScroll(isAtBottom)
  }

  // Auto-scroll effect
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [logs, autoScroll])

  // Initial scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView()
      setAutoScroll(true)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-auto"
      onScroll={checkAutoScroll}
    >
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-1">
        {logs.map((log, index) => (
          <div 
            key={index}
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{
              __html: Anser.ansiToHtml(log, {
                use_classes: true
              })
            }}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      
      {/* Auto-scroll toggle */}
      <div className="sticky bottom-2 left-full ml-2">
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className={`px-3 py-1 rounded ${
            autoScroll 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white text-xs transition-colors`}
        >
          {autoScroll ? 'Auto ▼' : 'Manual ▲'}
        </button>
      </div>
    </div>
  )
}