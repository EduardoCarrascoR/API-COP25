export class CreateProductDto{
    readonly  id: number
    readonly rut: number
    readonly name: string
    readonly firstSurname: string
    readonly secondSurname: string
    readonly password: string
    readonly email: string
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Date
    readonly state: number
}