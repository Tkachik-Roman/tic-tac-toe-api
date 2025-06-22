import { Module } from '@nestjs/common';
import { WebModule } from './web/web.module';
import { DomainModule } from './domain/domain.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [
    DatasourceModule,
    DomainModule,
    WebModule,
  ],
})
export class AppModule {}