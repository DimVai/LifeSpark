class navMenu extends HTMLElement {
    constructor(){
        super();

        let levelNames = this.getAttribute('data-level-objects').split(',');
        let levelCols = this.getAttribute('data-levels-columns').split(',');
        
        this.innerHTML = /*html*/ `
        <ul appml-data="js/categorization.js">
            <li appml-repeat="${levelNames[0]}">{{${levelCols[0]}}}


            </li>

        </ul>
        
        `;
    }
}
window.customElements.define('nav-menu',navMenu);