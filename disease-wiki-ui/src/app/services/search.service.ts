import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apollo: Apollo) {}

  search(searchText: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query ($searchText: String!) {
          knowledgeBase(searchText: $searchText) {
            name
            diseases
            description
            released
          }
        }
      `,
      variables: {
        searchText: searchText,
      },
    });
  }
}
