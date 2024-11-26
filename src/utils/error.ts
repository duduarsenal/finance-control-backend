import { HttpStatusCode } from "@enums";
import { ZodError } from "zod";

// Handler para as exceptions do aplicativo no geral
export class AppException extends Error{

    public status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status; // Código de status HTTP
    }
}

//Handler para as exceptions do tipo zod (formatação e tipagem)
export class ZodException extends Error{

    public message: string;
    public status: number;

    constructor(error: any){
        super()
        this.message = this.formatZodError(error)
        this.status = HttpStatusCode.BadRequest
    }

    private formatZodError(error: ZodError): string {
        return error.errors.map((err) => {
            return err.message
        }).join(", ")
    }

}