import { clsx } from "clsx"
import { toast } from "react-hot-toast"
import { twMerge } from "tailwind-merge"
import * as z from "zod"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price, currency = "USD", notation = "standard") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation
  }).format(Number(price))
}

export function formatBytes(bytes, decimals = 0, sizeType = "normal") {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
    }`
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function unslugify(str) {
  return str.replace(/-/g, " ")
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export function toSentenceCase(str) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())
}

export function truncate(str, length) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isArrayOfFile(files) {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every(file => file instanceof File)
}

export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function catchError(err) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

export function catchClerkError(err) {
  const unknownErr = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if ((err)) {
    return toast.error(err)
  } else {
    return toast.error(unknownErr)
  }
}

export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}

export function calculatePaymentAmount(items) {
  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  )
  const fee = total * 0.1
  return {
    total: Number((total * 100).toFixed(0)),
    fee: Number((fee * 100).toFixed(0))
  }
}
