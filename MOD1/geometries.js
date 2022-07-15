var result; // used to temporary store loadDoc result as text
const geometries = []; // contains all the geometry of the .obj loaded
const textures = []; 

function setGeometries(gl) {

    function loadDoc(url) {
        
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function() {
            
            if (xhttp.readyState == 4) {
                result = xhttp.responseText;
           }
        };
        xhttp.open("GET", url, false);
        xhttp.send(null);
    }

    // UPPER
    loadDoc(PATH_BODY);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_LACES);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_TOUNG);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_LATERAL_MESH);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_TOE_MESH);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_SIDE_MESH);
    geometries.push(parseOBJ(result));

    // SOLE
    loadDoc(PATH_SOLE);
    geometries.push(parseOBJ(result));

    // LOGOS
    loadDoc(PATH_LEFT_LOGO);
    geometries.push(parseOBJ(result));
    loadDoc(PATH_RIGHT_LOGO);
    geometries.push(parseOBJ(result));

    // BACK
    loadDoc(PATH_BACK);
    geometries.push(parseOBJ(result));

    // PLANE
    {
		const S = 15; 		
		const H = 0.15; 

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: [ 0,0, 1,0, 0,1, 1,1,] },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{ numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};
        geometries.push(arrays_floor);
	}

    // FRUSTUM
    const cubeLinesBufferInfo = webglUtils.createBufferInfoFromArrays(gl, {
        position: [
          -1, -1, -1,
           1, -1, -1,
          -1,  1, -1,
           1,  1, -1,
          -1, -1,  1,
           1, -1,  1,
          -1,  1,  1,
           1,  1,  1,
        ],
        indices: [
          0, 1,
          1, 3,
          3, 2,
          2, 0,
    
          4, 5,
          5, 7,
          7, 6,
          6, 4,
    
          0, 4,
          1, 5,
          3, 7,
          2, 6,
        ],
    });
    geometries.push(cubeLinesBufferInfo);
}

function setTextures(gl) {
    textures[0] = textureFromImage(gl, PATH_BLACK_LEATHER);
    textures[1] = textureFromImage(gl, PATH_BLUE_LEATHER);
    textures[2] = textureFromImage(gl, PATH_ORANGE_LEATHER);
    textures[3] = textureFromImage(gl, PATH_RED_LEATHER);
    textures[4] = textureFromImage(gl, PATH_WHITE_LEATHER);
    textures[5] = textureFromImage(gl, PATH_SOLE_RUBBER);
    textures[6] = textureFromImage(gl, PATH_LACES_MESH);
    textures[7] = textureFromImage(gl, PATH_MARBLE);
    textures[8] = textureFromImage(gl, PATH_ME);
}


