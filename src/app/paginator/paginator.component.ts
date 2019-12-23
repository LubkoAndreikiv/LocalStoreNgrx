import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() currentPage = 0;
  @Input() totalPageCount = 0;
  @Input() showPagesCount = 0;

  @Output() pageClicked: EventEmitter<number> = new EventEmitter();

  pageNumbers: number[];
  showBackward: boolean;
  showForward: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentPage) {
      this.currentPage = changes.currentPage.currentValue;
    }

    if (changes.totalPageCount) {
      this.totalPageCount = changes.totalPageCount.currentValue;
    }

    if (changes.showPagesCount) {
      this.showPagesCount = changes.showPagesCount.currentValue;
    }

    this.fillPagination();
  }

  setCurrentPage(page: number): void {
    this.pageClicked.emit(page);
  }

  private fillPagination() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.totalPageCount) {
      this.currentPage = this.totalPageCount;
    }

    const separator = Math.floor(this.showPagesCount / 2);

    const start = this.totalPageCount > this.currentPage + this.showPagesCount
      ? Math.max(this.currentPage - separator, 1)
      : Math.max(this.totalPageCount - this.showPagesCount + 1, 1);

    const end = Math.min(start + this.showPagesCount, this.totalPageCount + 1);
    this.pageNumbers = new Array<number>(end - start)
      .fill(1)
      .map((d, i) => start + i);

    this.showBackward = this.currentPage !== 1;
    this.showForward = this.pageNumbers.length  !== this.currentPage;
  }
}
