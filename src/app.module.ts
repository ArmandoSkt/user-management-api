import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserService } from './domain/services/user.service';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class AppModule {
}
