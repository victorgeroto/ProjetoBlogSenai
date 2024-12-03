import { Ipost } from './ipost'; // Interface para o modelo de Post
import { HttpClient } from '@angular/common/http'; // Cliente HTTP para comunicacao com a API
import { Injectable } from '@angular/core'; // Para tarnar o serviço injetável
import { Observable, catchError, of } from 'rxjs'; // Gerenciamento de fluxos assincronos e err
import { posts } from '../../data/mock-dados'; // Dados locais de exemplo

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = 'http://localhost:8080/posts'; // URL da API Spring Boot

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Ipost[]>{
    return this.http.get<Ipost[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao buscar posts da API, usando posts locais: ', error);
        return of(posts);
      })
    )
  }
  // Método para obter um post por ID da API
  getPostById(id: number): Observable<Ipost> {
    const url = '${this.apiUrl}/${id}';
    return this.http.get<Ipost>(url).pipe(
      catchError(error => {
        console.error('Erra ao buscar o post com ID ${id}: ', error);
        return of(null as any); // Retorna null como Cservable en caso de erro
      })
    );
  }

  // Método para adicionar um novo post à API
  addPost(newPost: Ipost): Observable<Ipost> {
    return this.http.post<Ipost>(this.apiUrl, newPost).pipe(
      catchError(error => {
        console.error('Erro ap adicionar un novo post:', error);
        return of(null as any); // Retorna null como Coservable en caso de erro
      })
    );
  }
  // Método para atualizar um post existente na API
  updatePost(updatedPost: Ipost): Observable<Ipost> {
    const url = '${this.apiUrl}/${updatedPost.id}';
    return this.http.put<Ipost>(url, updatedPost).pipe(
      catchError(error => {
        console.error('Erro ao atualizar o post com ID {updatedPost.id}:', error);
        return of(null as any); // Retorna null como Cbservable en caso de erro
      })
    );
  }
  // Método para deletar um post por ID na API
  deletePost(id: number): Observable<void> {
    const url = '${this.apiurl}/${id}';
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Erro ao deletar o post com ID $(id):', error);
        return of(); // Retorna um Observable vazio en caso de erro
      })
    );
  }
}