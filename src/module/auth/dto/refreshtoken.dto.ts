import { IsMongoId, IsNotEmpty, IsUUID } from "class-validator";


export class RefreshTokenDTO {

    @IsUUID()
    token: string;

}

//{"token":"string","userId":"string}