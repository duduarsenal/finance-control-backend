import { HttpStatusCode } from "@enums";
import { ZodError } from "zod";

//Handler para as exceptions do tipo zod (formatação e tipagem)
export class ZodException{

    private error: string;

    constructor(error: any){
        this.error = this.formatZodError(error)
    }

    private formatZodError(error: ZodError): string {
        return error.errors.map((err) => {
            return err.message
        }).join(", ")
    }

    public toResponse(): {status: HttpStatusCode, message: string} {
        return {
            status: HttpStatusCode.BadRequest,
            message: this.error
        }
    }
}