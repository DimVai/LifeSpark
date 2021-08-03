/* jshint unused:false , strict:global */
"use strict"; 

let App = {};
let Category = App.Category;
let log = console.log;
var Categorization;
var Categories;

let uniqueArray = arr => [...new Set(arr)];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


/** @type {(array:string[],UlClass:string,LiClass:string) => HTMLElement} */
let arrayToList = (array, UlClass="", LiClass="", typeOfElement="span", classOfElement="") => {
    let container = $("<div></div>").text(""); //το απαιτεί αν και δεν εξάγεται το div!!!
    let list = $("<ul></ul>").addClass(UlClass).text("");
    array.forEach((elementText) => {
        let element = $(`<${typeOfElement}></${typeOfElement}>`).addClass(classOfElement).text(elementText);
        list.append($("<li></li>").addClass(LiClass).html(element));
    });
    container.append(list);
    return container.html();
};

/** @type {(category:string) => string[]} */
let CategoryActivities = (category) => {
    return Categorization.filter(record => (record.Category==category) ).map(record=>record.Activity) ;
};

/** @type {(section:string) => string[]} */
let SectionCategories = (section) => {
    return Categories.filter(record=>(record.Section==section)).map(record=>record.Category);
};

// filter+map είναι όπως select+where στην SQL (με αντίστροφη σειρά)!
/** @type {(selectField:string,fromObject:Object[],whereVariable:string,whereEquals:string, unique:boolean) => string[]} */
let objectQuery = (selectField,fromObject,whereVariable,whereEquals,unique=false) => {
    let array;
    if (selectField == "*") {array = fromObject.filter(record=>(record[whereVariable]==whereEquals))}
        else { array = fromObject.filter(record=>(record[whereVariable]==whereEquals)).map(record=>record[selectField]);}
    if (unique==true) {
        let uniqueArray = arr => [...new Set(arr)];
        return uniqueArray(array);
    } else {  return unique!="unique" ? array : uniqueArray(array); }
};

let navToggleButton = `<button class="btn-nav rounded dropdown-toggle"></button>`;

$.getScript( "https://www.w3schools.com/appml/2.0.3/appml.js", function afterAppML() {

    $.getJSON("js/categorization.json", function afterCategorization(jsonObj) {

        Categorization = jsonObj.Categorization;
        Categories = jsonObj.Categories;
    
        class NavCategory extends HTMLElement {
            constructor(){
                super();
                let category = this.getAttribute('category');
                let categoryActivities = CategoryActivities(category);  //Array of activites
                let elementContainer = $('<div></div>').addClass("nav-category").html('<button class="nav-category-title rounded">'+category+'</button>');       //το απαιτεί αν και δεν εξάγεται το div!!!
                elementContainer.append(arrayToList(categoryActivities,"nav-category-list list-unstyled mx-4","nav-activity","a", "nav-activity-link"));
                this.outerHTML = elementContainer.html();
            }
        }
        window.customElements.define('nav-category',NavCategory);
    
        $(".nav-category-list").hide();
        $(navToggleButton).insertAfter(".nav-category-title");
        $(".nav-list").addClass('show');


        //$(".btn-nav").on("click",function(){$(this).next("ul").slideToggle(($(this).next("ul").children().length)*300)});
        $(".btn-nav").on("click",function(){
            $(this).next("ul").slideToggle(400);
            $(this).toggleClass('upside-down');
        });
    
    
    });

  });


