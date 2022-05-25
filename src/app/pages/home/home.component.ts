import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articleList: IArticle[] = [];
  filteredArticleList:IArticle[] = [];
  numberOfArticlesToDisplay = 3
  startIndex = 0;
  endIndex = 0 + this.numberOfArticlesToDisplay - 1;
  isLoading = false;
  articlesSubscribtion = new Subscription();
  isModalOpen = false;
  selectedArticle: IArticle = {
    id: 0,
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    content: ''
  }

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.isLoading = false;
    this.articlesSubscribtion = this.articlesService.getArticles().subscribe((response) => {
      this.articleList = response;
      this.filteredArticleList = response.filter((a, i) =>  i >= this.startIndex && i <= this.endIndex )
      this.isLoading = false;
    });
  }

  prevArticles() {
    this.startIndex = this.startIndex - this.numberOfArticlesToDisplay;
    this.endIndex = this.endIndex - this.numberOfArticlesToDisplay;
    this.filteredArticleList = this.articleList.filter((a, i) =>  i >= this.startIndex && i <= this.endIndex )

  }

  nextArticles() {
    this.startIndex = this.startIndex + this.numberOfArticlesToDisplay;
    this.endIndex = this.endIndex + this.numberOfArticlesToDisplay;
    this.filteredArticleList = this.articleList.filter((a, i) =>  i >= this.startIndex && i <= this.endIndex )
  }


  resetSelectedArticle() {
    this.selectedArticle = {
      id: 0,
      title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    content: ''
    }
  }

  ngOnDestroy(): void {
    this.articlesSubscribtion.unsubscribe();
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen = modalState;
  }

  selectArticle(selectedArticle: IArticle) {
    this.selectedArticle = selectedArticle;
    this.toggleModal(true);
  }

}
