import { IsEmail, IsString, MaxLength } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Realtor = 'Realtor',
}

@Entity({ name: 'users' })
export class UserEntity extends CoreEntity {
    @PrimaryColumn()
    @IsString()
    id: string;

    @Column({ length: 60, unique: true })
    @IsEmail()
    @MaxLength(60)
    email!: string;

    @Column({ length: 60 })
    @IsString()
    @MaxLength(60)
    password!: string;

    @Column({ nullable: true, length: 50 })
    name?: string;

    @Column({ length: 60 })
    @IsString()
    @MaxLength(60)
    signupVerifyToken: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;
}
