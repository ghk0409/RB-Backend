import { ICommand } from '@nestjs/cqrs';
import { CreateAccountDto } from 'src/users/interface/dtos/createAccount.dto';

export class CreateAccountCommand implements ICommand {
    constructor(public readonly createAccountDto: CreateAccountDto) {}
}
