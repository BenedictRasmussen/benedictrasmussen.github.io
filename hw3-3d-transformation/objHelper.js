var objVertices;
var objNormals;


function getObj(objString)
{
    let vertices = [];
    let UVs = [];
    let normals = [];
    let faces = [];
    let faceNormals = [];

    let lines = objString.split("\n");

    for(let j = 0; j < lines.length; j++)
    {
        let i = lines[j];

        if(i[0] == 'v')
        {
            if(i.length > 0)
            {
                if(i[1] == ' ')
                {
                    ///Parse vertex
                    let vertexArray = i.substr(2).split(' ');
                    vertices.push([
                        parseFloat(vertexArray[0]),
                        parseFloat(vertexArray[1]),
                        parseFloat(vertexArray[2])
                    ]);

                }
                else if(i[1] == 't')
                {
                    ///Parse UV
                    let UVArray = i.substr(3).split(' ');
                    UVs.push([
                        parseFloat(UVArray[0]),
                        parseFloat(UVArray[1])
                    ]);
                }
                else if(i[1] == 'n')
                {
                    ///parse normal
                    let normalArray = i.substr(3).split(' ');
                    normals.push([
                        parseFloat(normalArray[0]),
                        parseFloat(normalArray[1]),
                        parseFloat(normalArray[2])
                    ]);
                }
            }
        }
        else if(i[0] == 'f' && i[1] == ' ')
        {
            let faceArray = i.substr(2).split(' ');
            for(let face = 0; face < 3; face++)
            {
                let subFace = faceArray[face];
                let subFaceSplit = subFace.split('/');
                for(let coord = 0; coord < 3; coord ++)
                {

                    var vertexInQuestion = parseFloat(subFaceSplit[0]) - 1;

                    faces.push(vertices[vertexInQuestion][coord]);

                    var normalInQuestion = parseFloat(subFaceSplit[1]) - 1;
                    faceNormals.push(normals[normalInQuestion][coord]);
                }
            }
        }
    }

    let toReturn = new Object();
    toReturn.vertices = vertices;
    toReturn.UVs = UVs;
    toReturn.normals = normals;
    toReturn.faces = faces;
    toReturn.faceNormals = faceNormals;

    return toReturn;

}