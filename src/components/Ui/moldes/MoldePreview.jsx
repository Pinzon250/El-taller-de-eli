import { useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"

// ✅ Le decimos a pdfjs dónde está el worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`

const MoldePreview = ({ pdfUrl }) => {
  const canvas1Ref = useRef(null)
  const canvas2Ref = useRef(null)

  useEffect(() => {
    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        // Página 1
        const page1 = await pdf.getPage(1)
        const viewport1 = page1.getViewport({ scale: 1.2 })
        const canvas1 = canvas1Ref.current
        const context1 = canvas1.getContext("2d")
        canvas1.width = viewport1.width
        canvas1.height = viewport1.height
        await page1.render({ canvasContext: context1, viewport: viewport1 }).promise

        // Página 2 (difuminada)
        if (pdf.numPages >= 2) {
          const page2 = await pdf.getPage(2)
          const viewport2 = page2.getViewport({ scale: 1.2 })
          const canvas2 = canvas2Ref.current
          const context2 = canvas2.getContext("2d")
          canvas2.width = viewport2.width
          canvas2.height = viewport2.height
          await page2.render({ canvasContext: context2, viewport: viewport2 }).promise
        }
      } catch (err) {
        console.error("Error al renderizar el PDF:", err)
      }
    }

    renderPDF()
  }, [pdfUrl])

  return (
    <div className="max-h-[700px] overflow-y-scroll overflow-x-hidden border rounded-l-xl shadow-md bg-white p-4 space-y-8">
      <canvas ref={canvas1Ref} className="w-full"/>

      <div className="relative">
        <canvas ref={canvas2Ref} className="opacity-70 w-full blur-[5px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center rounded-full text-white font-bold p-3 mb-8">
          <h2 className="bg-pink-500 py-1 px-2 rounded-full">Compra este molde para desbloquearlo</h2>
        </div>
      </div>
    </div>
  )
}

export default MoldePreview