import exportAst from 'exporter/ast.exporter';


describe( 'AST exporter', () =>
{

    it( 'should export css in an array as an array of AST', () =>
    {
        const ast = exportAst( ['.toggle { color : pink } ', '.bounce { width : 30px; }'] );

        expect( ast ).to.be.an( 'array' );
        expect( ast ).to.have.length( 2 );
        expect( ast[0].stylesheet.rules[0].selectors ).to.eql( ['.toggle'] );
        expect( ast[0].stylesheet.rules[0].type ).to.equal( 'rule' );
        expect( ast[0].stylesheet.rules[0].declarations[0].property ).to.equal( 'color' );
        expect( ast[0].stylesheet.rules[0].declarations[0].value ).to.equal( 'pink' );
        expect( ast[1].stylesheet.rules[0].selectors ).to.eql( ['.bounce'] );
        expect( ast[1].stylesheet.rules[0].type ).to.equal( 'rule' );
        expect( ast[1].stylesheet.rules[0].declarations[0].property ).to.equal( 'width' );
        expect( ast[1].stylesheet.rules[0].declarations[0].value ).to.equal( '30px' );
    } );
} )