//Copyright 2016, B. Ricks for UNO CSCI 4980, Fall 2016

class ShaderProgram{
    constructor(inFSName, inVSName, inAttribList){
        this.fsName = inFSName;
        this.vsName = inVSName;
        this.attribList = inAttribList;

        var fragmentShader = getShader(gl, this.fsName);
        var vertexShader = getShader(gl, this.vsName);


        // Create the shader program

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragmentShader);
        gl.linkProgram(this.shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
        }


        this.attributes = [];

        for(let i = 0; i < this.attribList.length; i++)
        {
            let localName = this.attribList[i].localName;
            let shaderName = this.attribList[i].shaderName;
            this.attributes[localName] = gl.getAttribLocation(this.shaderProgram, shaderName);
        }

    }
}