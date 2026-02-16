export interface StoredVoice {
  id: string
  name: string
  label: string
  type: "browser" | "recorded" | "celebrity"
  pitch: number
  rate: number
  browserVoiceName?: string
  audioBlob?: Blob
  createdAt: number
}

const DB_NAME = "selah-voices"
const STORE_NAME = "voices"
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

export async function getVoices(): Promise<StoredVoice[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function saveVoice(voice: StoredVoice): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(voice)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function deleteVoice(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)
    const request = store.delete(id)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export const CELEBRITY_VOICE_PRESETS: Omit<StoredVoice, "id" | "createdAt">[] = [
  {
    name: "Wise Elder",
    label: "A deep, reassuring elder voice",
    type: "celebrity",
    pitch: 0.8,
    rate: 0.8,
  },
  {
    name: "Loving Mother",
    label: "A warm, gentle maternal voice",
    type: "celebrity",
    pitch: 1.2,
    rate: 0.85,
  },
  {
    name: "Calm Narrator",
    label: "Like Morgan Freeman reading your prayer",
    type: "celebrity",
    pitch: 0.75,
    rate: 0.78,
  },
  {
    name: "Gentle Pastor",
    label: "A soothing, encouraging pastoral voice",
    type: "celebrity",
    pitch: 0.95,
    rate: 0.82,
  },
  {
    name: "Inspiring Leader",
    label: "Like Oprah speaking from the heart",
    type: "celebrity",
    pitch: 1.1,
    rate: 0.88,
  },
  {
    name: "Meditative Guide",
    label: "A peaceful, mindfulness-style delivery",
    type: "celebrity",
    pitch: 1.0,
    rate: 0.7,
  },
]
