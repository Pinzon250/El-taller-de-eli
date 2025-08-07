// Se tipan los valores de los productos que estan en el sheet
export interface Producto {
    Id: string,
    Titulo: string,
    Descripcion: string,
    Precio: string,
    Categoria: string,
    Imagen: string,
    PDF?: string
}

// 
export function parseSheetData(data: any): Producto[] {
    if (!data?.values) throw new Error("No se encontraron datos en la hoja")

    const headers = data.values[0].map((h: string) => h.trim().toLowerCase())
    const rows = data.values.slice(1)

    return rows.map((row: Array<string | undefined>) => {

        const producto: any = {}

        headers.forEach((header: string, index: number) => {
            producto[header] = row[index]?.trim() || ""
        })

        if (!producto.id || producto.id === "") {
            producto.id = producto.Titulo
            .normalice("NFD").replace(/[\u0300-\u036f]/g, "")
            .toLowerCase().replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
        }
        return {
            Id: producto.id,
            Titulo: producto.titulo,
            Descripcion: producto.descripcion,
            Precio: producto.precio,
            Categoria: producto.categoria,
            Imagen: producto.imagen,
            PDF: producto.pdf
        }
    })
}