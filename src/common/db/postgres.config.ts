import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/db/entity/user.entity';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  type: any;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any[];
  synchronize: boolean;

  constructor(private configService: ConfigService) {
    this.type = 'postgres';
    this.host = 'localhost';
    this.port = 5432;
    this.username = 'postgres';
    this.password = 'password';
    this.database = 'mydatabase';
    this.entities = [UserEntity];
    this.synchronize = true;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: this.entities,
      synchronize: this.synchronize,
      logging: true,
    };
  }
}
