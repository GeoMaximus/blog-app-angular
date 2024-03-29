import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: IArticle = {
    id: 0,
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    saying: "",
    content: ""
  };

  @Output() selectArticle: EventEmitter<IArticle> = new EventEmitter<IArticle>();
  @Output() fetchArticles: EventEmitter<string> = new EventEmitter<string>();

  deleteArticleSubscription = new Subscription();

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
  }

  editArticle() {
    this.selectArticle.emit(this.article);
  }

  deleteArticle() {
    const id = this.article.id || 0;
    this.deleteArticleSubscription = this.articleService.deleteArticle(id).subscribe((response) => {
      this.fetchArticles.emit('');
    });
  }

  ngOnDestroy(): void {
    this.deleteArticleSubscription.unsubscribe();
  }

}
