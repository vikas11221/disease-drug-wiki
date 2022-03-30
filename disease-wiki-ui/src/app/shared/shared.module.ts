import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [SearchBarComponent, SearchResultComponent],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.apiUrl,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  imports: [CommonModule, ApolloModule, HttpClientModule],
  exports: [SearchBarComponent, SearchResultComponent],
})
export class SharedModule {}
