"use client"
import { useState, useEffect } from "react"
import { FaTwitter, FaFacebook, FaLinkedin, FaShare, FaClipboard, FaClipboardCheck } from "react-icons/fa"

export default function ShareButtons({ url, title, description }: { url: string; title: string; description: string }) {
  const [isCopied, setIsCopied] = useState(false)
  const [supportsShare, setSupportsShare] = useState(false)
  const [supportsClipboard, setSupportsClipboard] = useState(false)

  useEffect(() => {
    setSupportsShare(!!navigator.share)
    setSupportsClipboard(!!navigator.clipboard?.writeText)
  }, [])

  const shareData = {
    title: title,
    text: description,
    url: url,
  }

  const handleWebShare = async () => {
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log("Error sharing:", err)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(description)

  return (
    <div className="flex items-center gap-2">
      {supportsShare && (
        <>
        <span className="hidden sm:inline-block text-sm text-gray-500">Share Article</span>
          <button
            onClick={handleWebShare}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Share"
          >
            <FaShare className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="w-5 h-5 text-blue-400" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="w-5 h-5 text-blue-600" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="w-5 h-5 text-blue-700" />
      </a>
      {supportsClipboard && (
        <button
          onClick={handleCopyLink}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isCopied ? "Link copied!" : "Copy link to clipboard"}
        >
          {isCopied ? (
            <div className="flex">
              <FaClipboardCheck className="w-5 h-5 text-green-500" />
              <span className="ml-2 text-green-500">Copied!</span>
            </div>   
          ) : (
            <FaClipboard className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}
    </div>
  )
}