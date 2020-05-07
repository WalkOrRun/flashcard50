import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';
import { CardSet } from '../Cardset';
import {CardService} from '../card.service';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css']
})
export class ViewSubjectComponent implements OnInit {
  constructor(private cardService : CardService, private fb : FormBuilder) { }
  cardBuilderForm = this.fb.group( {
    subject : ['']
  })
  tempCard : Card[] = [];
  cardStore : Card;
  answerVisable : boolean = false;
  cardSet : CardSet = {
    subject : '',
    Card : this.tempCard,
    setID : 1,
    accountID : 1
  };
  subjectString : string;
  showCardAnswer : boolean[] = [];
  temp : boolean = false;
  
  getCards() {
    return this.cardService.getMyCreatedSets();
  }
  displayQuestion(index : number) {
     this.showCardAnswer[index] = false;
     
  }
  displayAnswer(index : number) {
    this.showCardAnswer[index] = true;
  }
  OpenSubject(index : number) {
    this.showCardAnswer = [];
    this.cardSet = this.cardService.getCardSet(index);
    this.tempCard = this.cardSet.Card;
    for(let card of this.cardSet.Card) {
      this.showCardAnswer.push(this.temp);
    }
  }
  isVisable(index : number) {
    return this.showCardAnswer[index];
  }
  notVisable(index : number) {
    return this.showCardAnswer[index] !== true;
  }
  search(subject : string) {
      this.subjectString = subject;
  }
  getSearchBoolean(index: number) {
    return this.cardService.search(index, this.subjectString);
  }
  onSubmit() {
    console.warn(this.cardBuilderForm.value);
    this.cardBuilderForm.reset();
  }
  notMarked(int : number) {
    this.tempCard[int].marked = true;
  }
  checkMarked(index : number) {
    return this.tempCard[index].marked === false;
  }
  ngOnInit() {
  }

}