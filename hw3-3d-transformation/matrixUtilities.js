//
// Matrix utility functions
//

var mvMatrixStack = [];

function mvPush()
{
    mvMatrixStack.push(mvMatrix.dup());
}

function mvPop()
{
    mvMatrix =  mvMatrixStack.pop();
}

function loadIdentity() {
    mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}


function mvRotate(v) {
    multMatrix(Matrix.RotationY(v).ensure4x4());
}

function mvRotateX(v) {
    multMatrix(Matrix.RotationX(v).ensure4x4());
}

function mvRotateZ(v) {
    multMatrix(Matrix.RotationZ(v).ensure4x4());
}

function mvScale(s){
    multMatrix(Matrix.Diagonal([s, s, s, 1]).ensure4x4());
}

function setMatrixUniforms(inShader) {
    var pUniform = gl.getUniformLocation(inShader.shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(inShader.shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

