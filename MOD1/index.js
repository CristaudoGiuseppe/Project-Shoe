"use strict";

function project_shoe_demo() {

    // Retrieve HTML elements for the interaction
    const canvas = document.getElementById('shoes-canvas');
    canvas.width = screen.width * 0.8;
    canvas.height = screen.height * 0.7;
    const gl = canvas.getContext("webgl");

    // Checking if WebGL is supported
    if (!gl) {
        console.log("WebGL not supported, trying experimental-webgl..");
        gl = canvas.getContext('experimental-webgl'); // for broswer like safari / edge / ie
    };
    if (!gl) {
        alert('Your broswer does not support WebGL!');
    };

    // With a depth texture we can attach it to a framebuffer and then later use the texture as input to a shader
    const ext = gl.getExtension('WEBGL_depth_texture');

    // Checking if WEBGL_depth_texture is supported
    if (!ext) {
        return alert('Your broswer does not support WEBGL_depth_texture');
    }

    // Define a simple GUI using resources/dat.gui.js with toggler to change environment settings
    define_gui();
    // Used to apply transformation to scene objects -> outside loop prevent memory usage
    var mo_matrix = m4.identity(), mo_matrix1;

    function drawUpper(programInfo, x, mov) {
        // BODY
        // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_body);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x + mov + 3, 0);
        // calls gl.uniform
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.body,
        });
        // calls gl.drawArrays or gl.drawElements
        webglUtils.drawBufferInfo(gl, bufferInfo_body);

        // SIDE MESH
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_lateral_mesh);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.upper_mesh,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_lateral_mesh);

        // LACES
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_laces);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x * 3 + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_world: mo_matrix1,
            u_texture: texture_settings.laces,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_laces);

        // TOUNG
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_toung);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_world: mo_matrix1,
            u_texture: texture_settings.toung,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_toung);

        // TOE
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_toe_mesh);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x * 2 + mov + 3, x * 2);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.upper_mesh,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_toe_mesh);

        // SIDE
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_side_mesh);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x * 2 + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.upper_mesh,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_side_mesh);
    }
    
    function drawSole(programInfo, x, mov) {
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_sole);
        
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, mov -x + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.sole,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_sole);
    }

    function drawLogos(programInfo, x, mov) {
        // RIGHT LOGO 
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_left_logo);
    
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, -x, x + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.logos,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_left_logo);

        // LEFT LOGO
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_right_logo);
    
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, +x, x + mov + 3, 0);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.logos,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_right_logo);
    }

    function drawBack(programInfo, x, mov) {
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_back);
        
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translate(mo_matrix1, 0, x + mov + 3, -x * 3);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_world: mo_matrix1,
            u_texture: texture_settings.back,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_back);
    }    

    function drawShoe(programInfo, x, mov) {
        drawSole(programInfo, x, mov);
        drawUpper(programInfo, x, mov);
        drawLogos(programInfo, x, mov);
        drawBack(programInfo, x, mov);
    }

    function drawPlane(programInfo) {
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_plane);
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: textures[MARBLE],
            u_world: m4.translation(0, -1.5, 0),
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_plane);
    }

    function drawBox(programInfo) {
        // BACK
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_plane);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translation(0, 13.5, -15);
        mo_matrix1 = m4.xRotate(mo_matrix1, degToRad(90));
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: textures[ME],
            u_world: mo_matrix1,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_plane);
        // LEFT
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo_plane);
        mo_matrix1 = m4.copy(mo_matrix);
        mo_matrix1 = m4.translation(-15, 13.5, 0);
        mo_matrix1 = m4.zRotate(mo_matrix1, degToRad(-90));
        webglUtils.setUniforms(programInfo, {
            u_colorMult: [0.9, 0.8, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: textures[MARBLE],
            u_world: mo_matrix1,
        });
        webglUtils.drawBufferInfo(gl, bufferInfo_plane);
    }
    
    function drawFrustum(cameraMatrix, colorProgramInfo, lightWorldMatrix, lightProjectionMatrix, projectionMatrix) {
        const viewMatrix = m4.inverse(cameraMatrix);
        gl.useProgram(colorProgramInfo.program);

        // Setup all the needed attributes.
        webglUtils.setBuffersAndAttributes(gl, colorProgramInfo, geometries[FRUSTUM]);

        // scale the cube in Z so it's really long to represent the texture is being projected toinfinity
        const mat = m4.multiply(lightWorldMatrix, m4.inverse(lightProjectionMatrix));

        webglUtils.setUniforms(colorProgramInfo, {
            u_color: [1, 1, 1, 1],
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_world: mat,
      });
        webglUtils.drawBufferInfo(gl, geometries[FRUSTUM], gl.LINES);
    }

    // compiles and links the shaders, looks up attribute and uniform locations
    const textureProgramInfo = webglUtils.createProgramInfo(gl, ['vertex-shader', 'fragment-shader']);
    const colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);

    // load textures
    setTextures(gl);

    // used to apply new texture to objects easier
    const texture_settings = {
        body: textures[WHITE_LEATHER],
        laces: textures[LACES_MESH],
        sole: textures[SOLE_RUBBER],
        logos: textures[BLACK_LEATHER],
        back: textures[ORANGE_LEATHER],
        upper_mesh: textures[ORANGE_LEATHER],
        toung: textures[WHITE_LEATHER],
    }

    // setGeometries
    setGeometries(gl);

    // Because data is just named arrays like this
    // {
    //   position: [...],
    //   texcoord: [...],
    //   normal: [...],
    // }
    // and because those names match the attributes in our vertex shader we can pass it directly into `createBufferInfoFromArrays`
    
    // create a buffer for each array by calling
    // gl.createBuffer, gl.bindBuffer, gl.bufferData
    const bufferInfo_body = webglUtils.createBufferInfoFromArrays(gl, geometries[BODY]);
    const bufferInfo_laces = webglUtils.createBufferInfoFromArrays(gl, geometries[LACES]);
    const bufferInfo_toung = webglUtils.createBufferInfoFromArrays(gl, geometries[TOUNG]);
    const bufferInfo_lateral_mesh = webglUtils.createBufferInfoFromArrays(gl, geometries[LATERAL_MESH]);
    const bufferInfo_toe_mesh = webglUtils.createBufferInfoFromArrays(gl, geometries[TOE_MESH]);
    const bufferInfo_side_mesh = webglUtils.createBufferInfoFromArrays(gl, geometries[SIDE_MESH]);

    const bufferInfo_sole = webglUtils.createBufferInfoFromArrays(gl, geometries[SOLE]);

    const bufferInfo_left_logo = webglUtils.createBufferInfoFromArrays(gl, geometries[LEFT_LOGO]);
    const bufferInfo_right_logo = webglUtils.createBufferInfoFromArrays(gl, geometries[RIGHT_LOGO]);

    const bufferInfo_back = webglUtils.createBufferInfoFromArrays(gl, geometries[BACK]);
    const bufferInfo_plane = webglUtils.createBufferInfoFromArrays(gl, geometries[PLANE]);
    
    const depthTexture = gl.createTexture();
    const depthTextureSize = 512;
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.texImage2D(
        gl.TEXTURE_2D,      // target
        0,                  // mip level
        gl.DEPTH_COMPONENT, // internal format
        depthTextureSize,   // width
        depthTextureSize,   // height
        0,                  // border
        gl.DEPTH_COMPONENT, // format
        gl.UNSIGNED_INT,    // type
        null);              // data
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,       // target
        gl.DEPTH_ATTACHMENT,  // attachment point
        gl.TEXTURE_2D,        // texture target
        depthTexture,         // texture
        0);                   // mip level

    // create a color texture of the same size as the depth texture
    const unusedTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, unusedTexture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        depthTextureSize,
        depthTextureSize,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // attach it to the framebuffer
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,        // target
        gl.COLOR_ATTACHMENT0,  // attachment point
        gl.TEXTURE_2D,         // texture target
        unusedTexture,         // texture
        0);                    // mip level

    // Variables introduced for camera movements
    var THETA = degToRad(38), PHI = degToRad(51);

    // Variables introduced for mouse and touch movements handling
    var drag, old_x, old_y, dX, dY;
    
    // Variables introduced for menaging mechanics status
    var exploded = false;

    /*================= Mouse handler for canvas ======================*/
    canvas.addEventListener("mousedown", function(e) {
        drag = true;
        old_x = e.pageX
        old_y = e.pageY;
        e.preventDefault();
    }, false)

    canvas.addEventListener("mouseup", function(e) {
        drag = false;
    }, false)

    canvas.addEventListener("mousemove", function(e) {
        if (!drag) {
            return false; 
        }
        dX = -(e.pageX - old_x) * 2 * Math.PI / canvas.width; 
        dY = -(e.pageY - old_y) * 2 * Math.PI / canvas.height; 
        THETA += dX;
        PHI += dY;
        old_x = e.pageX;
        old_y = e.pageY; 
        e.preventDefault();
    }, false)

    /*================= Touch mobile handler for canvas ======================*/
    
    canvas.addEventListener("touchstart", function (e) {
        drag = true;
        old_x =  e.touches[0].clientX;
        old_y =  e.touches[0].clientY;
        e.preventDefault();  
    }, false);

    canvas.addEventListener("touchend", function (e) {
        drag = false;
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        if (!drag) {
            return false; 
        }
        dX = -(e.touches[0].clientX - old_x) * 2 * Math.PI / canvas.width; 
        dY = -(e.touches[0].clientY - old_y) * 2 * Math.PI / canvas.height; 
        THETA += dX;
        PHI += dY;
        old_x = e.touches[0].clientX;
        old_y = e.touches[0].clientY;
        e.preventDefault();
    }, false);

    /*================= Change textures handler ======================*/
    {
        const button_body_black = document.getElementById("body_black");
        button_body_black.onclick = function() {
            texture_settings.upper_mesh = textures[BLACK_LEATHER];
            document.getElementById('output_body').style.display = 'none';
        }
        const button_body_red = document.getElementById("body_red");
        button_body_red.onclick = function() {
            texture_settings.upper_mesh = textures[RED_LEATHER];
            document.getElementById('output_body').style.display = 'none';
        }
        const button_body_orange = document.getElementById("body_orange");
        button_body_orange.onclick = function() {
            texture_settings.upper_mesh = textures[ORANGE_LEATHER];
            document.getElementById('output_body').style.display = 'none';
        }
        const button_body_blue = document.getElementById("body_blue");
        button_body_blue.onclick = function() {
            texture_settings.upper_mesh = textures[BLUE_LEATHER];
            document.getElementById('output_body').style.display = 'none';
        }
        const button_body_image = document.getElementById("change_body");
        button_body_image.onclick = function() {
            texture_settings.upper_mesh = textureFromImage(gl, image_body.src);
            document.getElementById('output_body').style.display = 'none';
        }
                             

        const button_logo_black = document.getElementById("logo_black");
        button_logo_black.onclick = function() {
            texture_settings.logos = textures[BLACK_LEATHER];
            document.getElementById('output_logo').style.display = 'none';
        }
        const button_logo_red = document.getElementById("logo_red");
        button_logo_red.onclick = function() {
            texture_settings.logos = textures[RED_LEATHER];
            document.getElementById('output_logo').style.display = 'none';
        }
        const button_logo_orange = document.getElementById("logo_orange");
        button_logo_orange.onclick = function() {
            texture_settings.logos = textures[ORANGE_LEATHER];
            document.getElementById('output_logo').style.display = 'none';
        }
        const button_logo_blue = document.getElementById("logo_blue");
        button_logo_blue.onclick = function() {
            texture_settings.logos = textures[BLUE_LEATHER];
            document.getElementById('output_logo').style.display = 'none';
        }
        const button_logo_image = document.getElementById("change_logo");
        button_logo_image.onclick = function() {
            texture_settings.logos = textureFromImage(gl, image_logo.src);
        }

        const button_back_black = document.getElementById("back_black");
        button_back_black.onclick = function() {
            texture_settings.back = textures[BLACK_LEATHER];
            document.getElementById('output_back').style.display = 'none';
        }
        const button_back_red = document.getElementById("back_red");
        button_back_red.onclick = function() {
            texture_settings.back = textures[RED_LEATHER];
            document.getElementById('output_back').style.display = 'none';
        }
        const button_back_orange = document.getElementById("back_orange");
        button_back_orange.onclick = function() {
            texture_settings.back = textures[ORANGE_LEATHER];
            document.getElementById('output_back').style.display = 'none';
        }
        const button_back_blue = document.getElementById("back_blue");
        button_back_blue.onclick = function() {
            texture_settings.back = textures[BLUE_LEATHER];
            document.getElementById('output_back').style.display = 'none';
        }
        const button_back_image = document.getElementById("change_back");
        button_back_image.onclick = function() {
            texture_settings.back = textureFromImage(gl, image_back.src);
        }
    }
    
    /*================= DRAWING ======================*/
    function drawScene(projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo) {
         // Make a view matrix from the camera matrix.
        const viewMatrix = m4.inverse(cameraMatrix);

        gl.useProgram(programInfo.program);
            
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: settings.bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: depthTexture,
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
        });

        if (toggle_movement_on_off) {
            if (movement >= settings.dMax || movement <= settings.dMin) {
                settings.dx = -settings.dx;
            };
            movement += settings.dx;
        };

        if (toggle_explotion_on_off) {
            if (!exploded) {
                // from eMin to eMax
                if (transl <= settings.eMax) {
                    transl += settings.de;
                    slider.value = transl * 100;
                } else {
                    exploded = true;
                    console.log("Shoes completly exploded");
                    toggle_explotion_on_off = false;
                }
            } else {
                // from eMax to eMin
                if (transl >= settings.eMin) {
                    transl -= settings.de;
                    slider.value = transl * 100;
                } else {
                    exploded = false;
                    console.log("Shoes completly built");
                    toggle_explotion_on_off = false;
                }
            }
        };

        drawPlane(programInfo);
        drawBox(programInfo);
        drawShoe(programInfo, transl, movement);
    }

    // Draw the scene.
    function render() {
        //gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // first draw from the POV of the light
        const lightWorldMatrix = m4.lookAt(
            [settings.posX, settings.posY, settings.posZ],          // position
            [settings.targetX, settings.targetY, settings.targetZ], // target
            settings.up,                                              // up
        );
        
        const lightProjectionMatrix = m4.perspective(
                degToRad(settings.fieldOfView),
                settings.projWidth / settings.projHeight,
                settings.zNear,  // near
                settings.zFar)   // far
           
        // draw to the depth texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
        gl.viewport(0, 0, depthTextureSize, depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if(toggle_shadow_on_off) {
            drawScene(lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, colorProgramInfo);
        }
        // now draw scene to the canvas projecting the depth texture into the scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(1.0, 0.8941, 0.7686, 1.0); // same color of the html body
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let textureMatrix = m4.identity();
        textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
        textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));

        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const projectionMatrix = m4.perspective(degToRad(settings.fieldOfView), aspect, settings.zNear, settings.zFar);

        var camera = [settings.D*Math.sin(PHI)*Math.cos(THETA), settings.D*Math.sin(PHI)*Math.sin(THETA), settings.D*Math.cos(PHI)];
        const cameraMatrix = m4.lookAt(camera, settings.target, settings.up);

        drawScene(projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, textureProgramInfo);
        if(toggle_frustum_on_off) {
            drawFrustum(cameraMatrix, colorProgramInfo, lightWorldMatrix, lightProjectionMatrix, projectionMatrix);
        }
        requestAnimationFrame(render);
    }

    const times = [];
    let fps;
    var div = document.getElementById('fps_counter');

    function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
        }
        times.push(now);
        fps = times.length;
        //console.log(fps);
        refreshLoop();
        if(settings.show_fps) {
            div.innerHTML = 'FPS: ' + fps;
        } else {
            div.innerHTML = '';
        }
    });}

    refreshLoop();
    requestAnimationFrame(render);  
}

