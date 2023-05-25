


class Bobina{

    constructor(tamanho, especura, metros, val_metro){

        this._tamanho = tamanho;
        this._especura = especura;
        this._metros = metros;
        this._valMetro = val_metro;

    }

    _renderBobina(){

        return 'Listar bobinas';

    }

}

//Parametros 
//  tamanho: tamanho do pacote em metros.
//  tipo: se é de tecido ou de plástico, tipo 1 é tecido, tipo 2 é plástico.
//  largura: se é fino ou grosso.

class Ziper{

    constructor(tamanho, type, largura){

        this._tamanho = tamanho;
        this._type = type;
        this._largura = largura;

    }

    _update(){



    }

    _render(){
        return 'Implementar o método para mostrar o zíper na tela.'
    }

}

class Embalagem{

    constructor(){

        this._listObjectBobina = [];
        this._listCombinacoes = [];
        this._tocos = [];
        this.bobinaEscolhida = '';
        this._maxDivision = 0;
        
    }

    _message(type, message){

        if (type) {
            return `<div class="${type}" >${message}<div>`;
        }

        return message;
        
    }

    _addBobina(objectBobina){
        this._listObjectBobina.push(objectBobina);
    }

    _getBobinas(){

        return this._listObjectBobina[0];

    }

    _ordenarListaDeCombinacoes(){

    }

    _update(){

        return 'Implemente o método update para atualizar a aplicação.'
        
    }

    _render(){
        return 'Implementar este método nas classes filhas.';
    }

     // Neste método recebo uma array de indices de combinações pelo parâmetro, faremos um for para usar esses indices pois o array vem com valores dinâmicos.

    _createObjectComb(arrComb){
        
        const obj = {id:this._maxDivision, tocos:[] ,medida:this._medida, quantFemea:0, quantMacho:0 ,diff:0};

        // console.log(arrComb)

        // Retorno boleano
        const verify_width = () => {

            this._quantFemea = 0;
            this._quantMacho = 0;

            for (let indexObj = 0; indexObj < arrComb.length; indexObj++) {

                obj.quantFemea += ( this._tocos[arrComb[indexObj]] == this._larguraFemea ? 200/this._comprimentoFemea : 0 );
                obj.quantFemea += ( this._tocos[arrComb[indexObj]] == this._comprimentoFemea ? 200/this._larguraFemea : 0 );

                obj.quantMacho += ( this._tocos[arrComb[indexObj]] == this._larguraMacho ? 200/this._comprimentoMacho : 0 );
                obj.quantMacho += ( this._tocos[arrComb[indexObj]] == this._comprimentoMacho ? 200/this._larguraMacho : 0 ); 

                obj.tocos.push(this._tocos[arrComb[indexObj]]);

                if (obj.quantFemea < obj.quantMacho) {
                    obj.diff = (obj.quantMacho - obj.quantFemea);
                }else{
                    obj.diff = (obj.quantFemea - obj.quantMacho);
                }

                obj.message = this._message(null, "A diferença entre macho e fêmea neste corte é de "+obj.diff+".");
                
            }
            
            return true;

        }

        if (verify_width()) {
            
            return obj;
        }

        return null;

    }


    // Funções que fazem as combinações 

    _comb2vezes(){

        console.log('Chamou esta função!');

        for (let index = 0; index < 4; index++) {
                
            for (let index2 = 0; index2 < 4; index2++) {

                const com = [index, index2];
                const f = this._createObjectComb(com);
                
                if (f) {
                    this._listCombinacoes.push(f);
                }
                
            }
            
        }

    }

    _comb3vezes(){

        
    }

    _comb4vezes(){

        
    }

    _comb5vezes(){

        for (let index = 0; index < 4; index++) {
                
            for (let index2 = 0; index2 < 4; index2++) {
                
                for (let index3 = 0; index3 < 4; index3++) {
                    
                    for (let index4 = 0; index4 < 4; index4++) {
                        
                        for (let index5 = 0; index5 < 4; index5++) {
                            
                            const com = [index, index2, index3, index4, index5];
                            const f = this._createObjectComb(com);
                            
                            if (f) {
                                this._listCombinacoes.push(f);
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }

        
    }

    _comb6vezes(){

        
    }

    _comb7vezes(){

        
    }

    _comb8vezes(){

        
    }

    
}


class EmbQuadrada extends Embalagem{

    constructor(medida){

        super();
        this._listObjectZiper = [];
        this._larguraFemea = 0;
        this._larguraMacho = 0;
        this._comprimentoFemea = 0;
        this._comprimentoMacho = 0;
        this._medida = medida;
        this._quantFemea = 0;
        this._quantMacho = 0;
        this._canvas1 = '';
        this._canvas2 = '';
    
        this._update();

    }

    _addZiper(objectZiper){
        this._listObjectZiper.push(objectZiper);
    }

    _update(){

        this._canvas1 = document.querySelector("#canvas1");
        this._canvas2 = document.querySelector("#canvas2");

        this._larguraFemea = this._medida[1];
        this._larguraMacho = this._medida[0];
        this._comprimentoFemea = (this._medida[2]*2)+this._larguraMacho;
        this._comprimentoMacho = (this._medida[2]*2)+this._larguraFemea;

        this._tocos.push(this._larguraFemea);
        this._tocos.push(this._larguraMacho);
        this._tocos.push(this._comprimentoFemea);
        this._tocos.push(this._comprimentoMacho);

        this._maxDivision = Math.max(1.40/this._larguraFemea, 1.40/this._larguraMacho, 1.40/this._comprimentoFemea, 1.40/this._comprimentoMacho);
        this._maxDivision = Math.floor(this._maxDivision);

        switch (this._maxDivision) {
            case 2:
                
                this._comb2vezes();

                break;

            case 5:

                this._comb5vezes();
                break;
        
            default:
                break;
        }

        this._listCombinacoes.sort(function(x, y){
            return x.diff - y.diff;
        });

    }

    // Desenhar na tela.

    _render(){

        const escala = 100;

        const top = 20;
        const left = 20;
        const width = this._larguraFemea * escala;
        const height = this._comprimentoFemea * escala;

        const ctx1 = this._canvas1.getContext('2d');

        ctx1.moveTo(left, top);
        ctx1.lineTo(left+width, top);
        ctx1.lineTo(left+width, height+top);
        ctx1.lineTo(left, height+top);
        ctx1.lineTo(left, top);

        ctx1.moveTo(left, top+top+height);
        ctx1.lineTo((this._larguraMacho * escala)+left, top+top+height);
        ctx1.lineTo((this._larguraMacho * escala)+left, top+top+height+(this._comprimentoMacho * escala));
        ctx1.lineTo(left, top+top+height+(this._comprimentoMacho * escala));
        ctx1.lineTo(left, top+top+height);

        ctx1.stroke();

    }

    // Neste método podemos implementar um sistema que muda o corte da bobina, ele mostra as opções em um select e podemos escolher qual seria a melhor forma de corte.

    // Neste mesmo raciocínio podemos criar filtros que se combinados chegamos ao resultado esperado.  ex: filtro de sobra: 20, filtro de femea:true

    _renderBobina(indice = null){

        const top = 20;
        const left = 20;
        const width = 0;
        const height = 0;

        const telaWidth = window.screen.width
        const telaHeight = window.screen.height

        const ctx2 = this._canvas2.getContext('2d');

        ctx2.moveTo(10, 10);
        ctx2.lineTo(telaWidth - 10, 10);
        ctx2.lineTo(telaWidth - 10, 70);
        ctx2.lineTo(10, 70);
        ctx2.lineTo(10, 10);

        if (indice > -1 && indice != null) {

            const obj = this._listCombinacoes[indice];
            let porcent = [];

            for (let index = 0; index < obj.tocos.length; index++) {

                const divisor = 1.40/obj.tocos[index];

                porcent.push(( !porcent.length ? (telaWidth - 10)/divisor : (((telaWidth - 10)/divisor) + porcent[index - 1])));

                ctx2.moveTo(porcent[index], 10);
                ctx2.lineTo(porcent[index], 70);
                
            }

            console.log(porcent);



        }



        ctx2.stroke();

    }



}


const bobina1 = new Bobina(1.40, 0.8, 200, 2.00);
const bobina2 = new Bobina(1.40, 0.10, 150, 2.00);

const ziper1 = new Ziper(200, 1, 0.2);


let chave = true;
const btn = document.querySelector("#btn-calcular");

if (chave) {
    btn.addEventListener("click", function(){

        const inputs = document.querySelectorAll("input");
        const medida = [];
    
        for (let index = 0; index < inputs.length; index++) {
            
            medida.push(parseFloat(inputs[index].value));
            
        }
    
        const embQuadrada1 = new EmbQuadrada(medida);
        embQuadrada1._addBobina(bobina1);
        embQuadrada1._addBobina(bobina2);
        embQuadrada1._addZiper(ziper1);
    
        embQuadrada1._render();
        embQuadrada1._renderBobina(0);

        chave = false;
        
    })
    
}



