import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';
import { CardSet } from '../Cardset';
import {CardService} from '../card.service';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-marked-cards',
  templateUrl: './marked-cards.component.html',
  styleUrls: ['./marked-cards.component.css']
})
export class MarkedCardsComponent implements OnInit {
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
  questionCard : Card[] = [];
  max : number;
  storeIndex : number = 0;
  showCardAnswer : boolean[] = [];
  temp : boolean = false;
  secondaryTempCard : Card[] = [];
  
  getCards() {
    return this.cardService.getMyCreatedSets();
  }
  displayQuestion(index : number) {
     this.showCardAnswer[index] = false;
  }
  displayAnswer(index : number) {
    this.showCardAnswer[index]= true;
  }
  OpenSubject(index : number) {
    this.showCardAnswer = [];
    this.cardSet = this.cardService.getCardSet(index);
    for(let card of this.cardSet.Card) {
      if(card.marked === true) {
        this.tempCard.push(card);
      }
    }
    this.questionCard.push(this.tempCard[0]);
    for(let card of this.cardSet.Card) {
      this.showCardAnswer.push(this.temp);
    }
  }
  isVisable(index : number) {
    if(this.tempCard.length !== 0) {
      return this.showCardAnswer[index];
    }
    else {
      return false;
    }
  }
  notVisable(index : number) {
    if(this.tempCard.length !== 0) {
    return this.showCardAnswer[index] !== true;
    }
    else {
      return false;
    }
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
  nextQuestion(index : number) {
    try {
    if(this.tempCard.length != 0) {
      if (index !== this.tempCard.length - 1){
        this.questionCard[0] = this.tempCard[index + 1]
        this.storeIndex = index + 1;
      }
      else if (index >= this.tempCard.length -1){
        this.questionCard[0] = this.tempCard[0];
        this.storeIndex = 0;
      }
      else {

      }
    }
    else {

    }
    }
    catch(Exeception) {

    }
  }
  previousQuestion(index : number) {
    try {
    if(this.tempCard.length != 0) {
      if(index !== 0) {
        this.questionCard[0] = this.tempCard[index -1];
        this.storeIndex = index -1;
      }
      else if (index === 0) {
        this.max = this.tempCard.length
        this.questionCard[0] = this.tempCard[this.max - 1];
        this.storeIndex = this.max - 1;
      }
    }
    else {

    }
    }
    catch(Exception) {
      
    }
  }
  selectQuestion(index : number) {
    if(index <= this.tempCard.length -1) {
      this.questionCard[0] = this.tempCard[index];
      this.storeIndex = index;
    }
  }
  getQuestionCard() {
    return this.questionCard[0].question;
  }
  getAnswerCard() {
    return this.questionCard[0].answer;
  }
  getIndex() {
    return this.storeIndex;
  }
  hasCards() {
    return this.tempCard.length != 0;
  }
  notMarked(int : number) {
    this.tempCard[int].marked = false;
    for(let card of this.tempCard) {
      if(card.marked === true) {
        this.secondaryTempCard.push(card);
      }
    }
    this.tempCard = this.secondaryTempCard;
    this.secondaryTempCard = [];
  }
  checkMarked(index : number) {
    return this.tempCard[index].marked === true;
  }


  ngOnInit() {
  }

}