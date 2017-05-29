import exportAst from 'exporter/ast.exporter';
import cssHelper from 'css';


describe( 'AST exporter', () =>
{

    let cssHelperSpy;

    before( () =>
    {
        cssHelperSpy = sinon.spy( cssHelper, 'parse' );
    } );

    it( 'should call the AST parser with the correct arguments', () =>
    {
        const css = ['.toggle { color : pink }', '.bounce { width : 30px; }'];

        exportAst( css );

        expect( cssHelperSpy.calledWith( '.toggle { color : pink }' ) ).to.be.true;
        expect( cssHelperSpy.calledWith( '.bounce { width : 30px; }' ) ).to.be.true;
    } );

} );