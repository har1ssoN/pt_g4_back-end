import { IsOptional, IsString } from "class-validator";

export class UserEntity {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    department: string;

    @IsString()
    course: string; 

    @IsOptional()
    profile_image?: Buffer;
}
