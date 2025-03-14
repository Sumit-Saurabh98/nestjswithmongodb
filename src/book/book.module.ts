import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    AuthModule,
    S3Module,
    MongooseModule.forFeature([{name: 'Book', schema: BookSchema}])
  ],
  controllers: [BookController],
  providers: [BookService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }]
})
export class BookModule {}
