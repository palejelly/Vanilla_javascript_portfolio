
(()=>{
    let yOffset=0;
    let prevScrollHeight=0; //현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 합. 
    let currentScene=0; //눈 앞에 보ㅗㄱ있는 scene
    let enterNewScene=false;//새로운 scene 이 시작된 순간 true
    let totalHeight;
    let canvasScaleRatio;
    let widthRatio;
    let widthRatio_reduced;
    let acc=0.1
    let delayedYOffset=0;
    let rafId;
    let rafState;
    
    const sceneInfo=[
        {
            // 0 
            type : 'sticky',
            heightNum: 2, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
                body: document.querySelector(`body`),
                container:document.querySelector('#s0'),
                subMessage:document.querySelector('.subMessage'),
                title:document.querySelector('#s0 .title'),
                img1:document.querySelector('#s0 .sub1 img'),
                img2:document.querySelector('#s0 .sub2 img'),
                
                sidebar:document.querySelector('.vertical-sidebar'),
                barItems:document.querySelectorAll('.vertical-sidebar .bar-item'),
                
                imagesPath:[
                './images/blend-image-1.jpg',
                './images/blend-image-2.jpg',
                ],
                images:[],
                
            },
            values:{
                white_theme_out : [0, 1, { start: 0.6, end: 0.9 }],
                title_opacity_out: [1,0,{start:0.6,end:0.9}],

                
            },
        },
        {
            //1 cube
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
            container:document.querySelector('#s1'),
            canvas1: document.querySelector('#s1 .image-canvas-1'),
            context1:document.querySelector('#s1 .image-canvas-1').getContext('2d'),
            canvas2: document.querySelector('#s1 .image-canvas-2'),
            context2:document.querySelector('#s1 .image-canvas-2').getContext('2d'),
            canvas3: document.querySelector('#s1 .image-canvas-3'),
            context3:document.querySelector('#s1 .image-canvas-3').getContext('2d'),
            canvas4: document.querySelector('#s1 .image-canvas-4'),
            context4:document.querySelector('#s1 .image-canvas-4').getContext('2d'),
            messageA:document.querySelector('#s1 .messageA'),
                
            descriptionA:document.querySelector('#n1 .descriptionA'),
            descriptionB:document.querySelector('#n1 .descriptionB'),
            descriptionC:document.querySelector('#n1 .descriptionC'),
            descriptionD:document.querySelector('#n1 .descriptionD'),
                
            menuPin:document.querySelector('#n1 .menu-pin'),    
            
            imagesPath: [
                './img/1-1/cube_axon_inverted.jpg',
                './img/1-1/cube_installation.jpg',
                './img/1-1/cube_model.jpg',
                './img/1-1/cube_note.jpg',
            ],
            images:[],
            },
            values:{
                white_theme_out : [0, 1, { start: 0.6, end: 0.9 }], // this is based on previus section
                
                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                messageA2_opacity_in: [0,1,{start:0,end:0.05}],
                canvas1_opacity_in:[0,1,{start:0,end:0.05}],
                canvas1_translateY_in: [40, 0, { start: 0, end: 0.05 }],
                canvas2_opacity_in:[0,1,{start:0.25,end:0.3}],
                canvas2_translateY_in: [40, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0,1,{start:0.25,end:0.3}],
                messageB_translateY_in: [40, 0, { start: 0.25, end: 0.3}],
                canvas3_opacity_in:[0,1,{start:0.5,end:0.55}],
                canvas3_translateY_in: [40, 0, { start: 0.5, end: 0.55 }],
                canvas4_opacity_in:[0,1,{start:0.75,end:0.80}],
                canvas4_translateY_in: [40, 0, { start: 0.75, end: 0.80 }],
                
                messageC_opacity_in: [0,1,{start:0.5,end:0.55}],
                messageC_translateY_in: [40, 0, { start: 0.5, end: 0.55}],
                messageC_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
                messageC_translateY_out: [0, -20, { start: 0.7, end: 0.75 }],
                
                messageD_opacity_in: [0,1,{start:0.75,end:0.8}],
                messageD_translateY_in: [40, 0, { start: 0.75, end: 0.8}],
                messageD_opacity_out: [1, 0, { start: 0.9, end: 0.95 }],
                messageD_translateY_out: [0, -20, { start: 0.9, end: 0.95 }],
                
                messageA_opacity_out: [1,0,{start:0.9,end:1.0}],
                messageA2_opacity_out: [1,0,{start:0.2,end:0.25}],
                canvas1_opacity_out:[1,0,{start:0.2,end:0.25}],
                canvas1_translateY_out: [0, -40,{start: 0.2, end: 0.25 }],
                canvas2_opacity_out:[1,0,{start:0.45,end:0.5}],
                canvas2_translateY_out: [0, -40,{start: 0.45, end: 0.5 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                canvas3_opacity_out:[1,0,{start:0.7,end:0.75}],
                canvas3_translateY_out: [0, -40,{start: 0.7, end: 0.75}],
                canvas4_opacity_out:[1,0,{start:0.95,end:1.0}],
                canvas4_translateY_out: [0, -40,{start: 0.95, end: 1.0 }],

            },
        },
        {
            //2 //villiage project
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
            container:document.querySelector('#s2'),
            canvas1: document.querySelector('#s2 .image-canvas-1'),
            context1:document.querySelector('#s2 .image-canvas-1').getContext('2d'),
            canvas2: document.querySelector('#s2 .image-canvas-2'),
            context2:document.querySelector('#s2 .image-canvas-2').getContext('2d'),
            canvas3: document.querySelector('#s2 .image-canvas-3'),
            context3:document.querySelector('#s2 .image-canvas-3').getContext('2d'),
            canvas4: document.querySelector('#s2 .image-canvas-4'),
            context4:document.querySelector('#s2 .image-canvas-4').getContext('2d'),
            messageA:document.querySelector('#s2 .messageA'),
            messageC:document.querySelector('#s2 .messageC'),
            messageC2:document.querySelector('#s2 .messageC2'),
            messageC3:document.querySelector('#s2 .messageC3'),
            pinC:document.querySelector('#s2 .messageC .pin'),
            pinC2:document.querySelector('#s2 .messageC2 .pin'),
            pinC3:document.querySelector('#s2 .messageC3 .pin'),

            descriptionA:document.querySelector('#n2 .descriptionA'),
            descriptionB:document.querySelector('#n2 .descriptionB'),
            descriptionC:document.querySelector('#n2 .descriptionC'),
            
            menuPin:document.querySelector('#n2 .menu-pin'),    
            imagesPath: [
                './img/1-2/site_slope_withcar-min.jpg',
                './img/1-2/model_plan.jpg',
                './img/1-2/model_axon.jpg',
                './img/1-2/model_main.jpg',

            ],
            images:[],
            },
            values:{
                
                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                
                canvas1_opacity_in:[0,1,{start:0,end:0.05}],
                canvas1_translateY_in: [40, 0, { start: 0, end: 0.05 }],
                canvas2_opacity_in:[0,1,{start:0.25,end:0.3}],
                canvas2_translateY_in: [40, 0, { start: 0.25, end: 0.3 }],
                canvas3_opacity_in:[0,1,{start:0.5,end:0.55}],
                canvas3_translateY_in: [40, 0, { start: 0.5, end: 0.55 }],
                canvas4_opacity_in:[0,1,{start:0.75,end:0.80}],
                canvas4_translateY_in: [40, 0, { start: 0.75, end: 0.80 }],
                
                messageA_opacity_out: [1,0,{start:0.95,end:1.0}],
                canvas1_opacity_out:[1,0,{start:0.2,end:0.25}],
                canvas1_translateY_out: [0, -40,{start: 0.2, end: 0.25 }],
                canvas2_opacity_out:[1,0,{start:0.45,end:0.5}],
                canvas2_translateY_out: [0, -40,{start: 0.45, end: 0.5 }],
                canvas3_opacity_out:[1,0,{start:0.7,end:0.75}],
                canvas3_translateY_out: [0, -40,{start: 0.7, end: 0.75}],
                canvas4_opacity_out:[1,0,{start:0.95,end:1.0}],
                canvas4_translateY_out: [0, -40,{start: 0.95, end: 1.0 }],
                
                messageC_translateY_in: [30, 0, { start: 0.55, end: 0.63 }],
				messageC_opacity_in: [0, 1, { start: 0.55, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.7, end: 0.75 }],
				messageC_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
				pinC_scaleY: [0.2, 1, { start: 0.55, end: 0.63 }],
				pinC2_scaleY: [0.2, 1, { start: 0.55, end: 0.63 }],
				pinC3_scaleY: [0.2, 1, { start: 0.55, end: 0.63 }],
                

                
                
            },
        },
        {
            //3
            type : 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,  
            objs:{
            container:document.querySelector('#s3'),
            canvas1: document.querySelector('#s3 .image-canvas-1'),
            context1:document.querySelector('#s3 .image-canvas-1').getContext('2d'),
            canvas2: document.querySelector('#s3 .image-canvas-2'),
//            context2:document.querySelector('#s3 .image-canvas-2').getContext('2d'),
            canvas3: document.querySelector('#s3 .image-canvas-3'),
//            context3:document.querySelector('#s3 .image-canvas-3').getContext('2d'),
            canvas4: document.querySelector('#s3 .image-canvas-4'),
//            context4:document.querySelector('#s3 .image-canvas-4').getContext('2d'),
            videoCanvas:document.querySelector('#s3 .video-canvas-0'),
            videoContext:document.querySelector('#s3 .video-canvas-0').getContext('2d'),
            messageA:document.querySelector('#s3 .messageA'),
            messageB:document.querySelector('#s3 .messageB'),
            messageC:document.querySelector('#s3 .messageC'),
            pinB: document.querySelector('#s3 .messageB .pin'),
            pinC: document.querySelector('#s3 .messageC .pin'),
            messageD:document.querySelector('#s3 .messageD'),
                
            descriptionA:document.querySelector('#n3 .descriptionA'),
            descriptionB:document.querySelector('#n3 .descriptionB'),
            menuPin:document.querySelector('#n3 .menu-pin'),    
                
                
            imagesPath: [
                './img/bookshelf/note_integrated.jpg',

            ],
            images:[],
            videoImages:[],
            },
            values:{
                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                messageA_opacity_out: [1,0,{start:0.95,end:1.0}],
                
                videImageCount:101,
                imageSequence:[0,302,{start:0.1,end:0.6}],
                canvas_opacity:[1,0,{start:0.6,end:0.7}],

            
                canvas1_opacity_in:[0,1,{start:0.65,end:0.70}],
                canvas1_translateY_in: [40, 0, { start: 0.65, end: 0.70 }],
                canvas2_opacity_in:[0,1,{start:0.83,end:0.88}],
                canvas2_translateY_in: [40, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0,1,{start:0.25,end:0.3}],
                messageB_translateY_in: [40, 0, { start: 0.25, end: 0.3}],
                canvas3_opacity_in:[0,1,{start:0.5,end:0.55}],
                canvas3_translateY_in: [40, 0, { start: 0.5, end: 0.55 }],
                canvas4_opacity_in:[0,1,{start:0.75,end:0.80}],
                canvas4_translateY_in: [40, 0, { start: 0.75, end: 0.80 }],
                
                canvas1_opacity_out:[1,0,{start:0.8,end:0.85}],
                canvas1_translateY_out: [0, -40,{start: 0.8, end: 0.85 }],
                canvas2_opacity_out:[1,0,{start:0.95,end:1}],
                canvas2_translateY_out: [0, -40,{start: 0.45, end: 0.5 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                canvas3_opacity_out:[1,0,{start:0.7,end:0.75}],
                canvas3_translateY_out: [0, -40,{start: 0.7, end: 0.75}],
                canvas4_opacity_out:[1,0,{start:0.95,end:1.0}],
                canvas4_translateY_out: [0, -40,{start: 0.95, end: 1.0 }],

                
                
				messageB_translateY_in: [30, 0, { start: 0.10, end: 0.15 }],
				messageB_opacity_in: [0, 1, { start: 0.10, end: 0.15 }],
				messageB_translateY_out: [0, -20, { start: 0.20, end: 0.23 }],
				messageB_opacity_out: [1, 0, { start: 0.20, end: 0.23 }],
				pinB_scaleY: [0.5, 1, { start: 0.10, end: 0.15 }],
                
                messageC_translateY_in: [30, 0, { start: 0.25, end: 0.30 }],
				messageC_opacity_in: [0, 1, { start: 0.25, end: 0.30 }],
				messageC_translateY_out: [0, -20, { start: 0.35, end: 0.40 }],
				messageC_opacity_out: [1, 0, { start: 0.35, end: 0.40 }],
				pinC_scaleY: [0.5, 1, { start: 0.35, end: 0.40 }],
                
				messageD_translateY_in: [40, 0, { start: 0.65, end: 0.70 }],
				messageD_opacity_in: [0, 1, { start: 0.65, end: 0.70 }],
				messageD_translateY_out: [0, -40, { start: 0.8, end: 0.85 }],
				messageD_opacity_out: [1, 0, { start: 0.8, end: 0.85 }],
                
            },
        },
        {
            //4 manifest differentials
            type : 'sticky',
            heightNum: 4, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
            container:document.querySelector('#s4'),
            canvas1: document.querySelector('#s4 .image-canvas-1'),
            context1:document.querySelector('#s4 .image-canvas-1').getContext('2d'),
            canvas2: document.querySelector('#s4 .image-canvas-2'),
            context2:document.querySelector('#s4 .image-canvas-2').getContext('2d'),
            canvas3: document.querySelector('#s4 .image-canvas-3'),
            context3:document.querySelector('#s4 .image-canvas-3').getContext('2d'),
            canvas4: document.querySelector('#s4 .image-canvas-4'),
            context4:document.querySelector('#s4 .image-canvas-4').getContext('2d'),
            canvas5:document.querySelector('#s4 .image-canvas-5'),
            messageA:document.querySelector('#s4 .messageA'),
                
            descriptionA:document.querySelector('#n4 .descriptionA'),
            descriptionB:document.querySelector('#n4 .descriptionB'),
            descriptionC:document.querySelector('#n4 .descriptionC'),
            
                
            menuPin:document.querySelector('#n4 .menu-pin'),    
                
                
            imagesPath: [
                './img/5-1/layer of changes.jpg',
                './img/5-1/walkability analysis.jpg',
                './img/5-1/whole analysis.jpg',
                './img/5-1/perspective analysis.jpg',
            ],
            images:[],
            videoImages:[],           
            },
            values:{
                canvas_opacity:[1,0,{start:0.9,end:1}],

                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                
                
                canvas1_opacity_in:[0,1,{start:0,end:0.05}],
                canvas1_translateY_in: [40, 0, { start: 0, end: 0.05 }],
                canvas2_opacity_in:[0,1,{start:0.25,end:0.3}],
                canvas2_translateY_in: [40, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0,1,{start:0.25,end:0.3}],
                messageB_translateY_in: [40, 0, { start: 0.25, end: 0.3}],
                canvas3_opacity_in:[0,1,{start:0.5,end:0.55}],
                canvas3_translateY_in: [40, 0, { start: 0.5, end: 0.55 }],
                canvas4_opacity_in:[0,1,{start:0.75,end:0.80}],
                canvas4_translateY_in: [40, 0, { start: 0.75, end: 0.80 }],
                canvas5_opacity_in:[0,1,{start:0.75,end:0.80}],
                canvas5_translateY_in: [40, 0, { start: 0.75, end: 0.80 }],
                
                messageA_opacity_out: [1,0,{start:0.9,end:1.0}],
                canvas1_opacity_out:[1,0,{start:0.2,end:0.25}],
                canvas1_translateY_out: [0, -40,{start: 0.2, end: 0.25 }],
                canvas2_opacity_out:[1,0,{start:0.45,end:0.5}],
                canvas2_translateY_out: [0, -40,{start: 0.45, end: 0.5 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                canvas3_opacity_out:[1,0,{start:0.7,end:0.75}],
                canvas3_translateY_out: [0, -40,{start: 0.7, end: 0.75}],
                canvas4_opacity_out:[1,0,{start:0.95,end:1.0}],
                canvas4_translateY_out: [0, -40,{start: 0.95, end: 1.0 }],
                canvas5_opacity_out:[1,0,{start:0.95,end:1.0}],
                canvas5_translateY_out: [0, -40,{start: 0.95, end: 1.0 }],
                
                
        },
    },
    {
            //5 ML with Navy
            type : 'sticky',
            heightNum: 4, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
            container:document.querySelector('#s5'),
            canvas1: document.querySelector('#s5 .image-canvas-1 img'),
            canvas2: document.querySelector('#s5 .image-canvas-2'),
            context2:document.querySelector('#s5 .image-canvas-2').getContext('2d'),
//            context3:document.querySelector('#s5 .image-canvas-3').getContext('2d'),
            messageA:document.querySelector('#s5 .messageA'),
                
            descriptionA:document.querySelector('#n5 .descriptionA'),
            descriptionB:document.querySelector('#n5 .descriptionB'),
            descriptionC:document.querySelector('#n5 .descriptionC'),
                
            menuPin:document.querySelector('#n5 .menu-pin'),    
                
            imagesPath: [
                './img/ML/dw_data_structure_long.png',
                './img/website/ThisWebsite.jpg',
            ],
            images:[],
            videoImages:[],           
            },
            values:{
                canvas_opacity:[1,0,{start:0.95,end:1}],
                
                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                canvas1_opacity_in:[0,1,{start:0,end:0.05}],
                canvas1_translateY_in: [40, 0, { start: 0, end: 0.05 }],
                canvas2_opacity_in:[0,1,{start:0.25,end:0.3}],
                canvas2_translateY_in: [50, 0, { start: 0.25, end: 0.3 }],
                canvas3_opacity_in:[0,1,{start:0.5,end:0.55}],
                canvas3_translateY_in: [40, 0, { start: 0.5, end: 0.55 }],

                canvas2_translateY_scroll:[0,0,{start:0.35, end:0.70}],
                                
                messageA_opacity_out: [1,0,{start:0.80,end:0.85}],
                canvas1_opacity_out:[1,0,{start:0.2,end:0.25}],
                canvas1_translateY_out: [0, -40,{start: 0.2, end: 0.25 }],
                canvas2_opacity_out:[1,0,{start:0.45,end:1}],
                canvas2_translateY_out: [0, -100,{start: 0.80, end: 1 }],
        },      
    },
    {
            //6 this Website
            type : 'sticky',
            heightNum: 4, //브라우저 높이의 5배로 세팅.
            scrollHeight: 0,
            objs:{
            container:document.querySelector('#s6'),
            canvas1: document.querySelector('#s6 .image-canvas-1'),
            context1:document.querySelector('#s6 .image-canvas-1').getContext('2d'),
            messageA:document.querySelector('#s6 .messageA'),

            descriptionA:document.querySelector('#n6 .descriptionA'),
            descriptionB:document.querySelector('#n6 .descriptionB'),
                
                
            menuPin:document.querySelector('#n6 .menu-pin'),    
                
            finalMessage:document.querySelector('#s6 .final-message'),
            lifedItems: [
                document.querySelector('.vertical-sidebar'),
                document.querySelector('#s6 .image-canvas-1'),
                document.querySelector('#s6 .messageA'),
                document.querySelector('#s6 .codes')
                ],
            imagesPath: [
                './img/website/ThisWebsite.jpg',
            ],
            images:[],
            videoImages:[],           
            },
            values:{
                messageA_opacity_in: [0,1,{start:0,end:0.05}],
                messageA_opacity_out: [1,0,{start:0.95,end:1.0}],
                                
                canvas1_scale_in:[0,(window.innerHeight-100)/7560,{start:0,end:0.1}],
                canvas1_translateY_in:[0,0,{start:0,end:0.1}],
                canvas1_translateX_in:[-50,-70,{start:0,end:0.1}],
                
                
                final_message_height:[0,22,{start:0.65,end:0.75}],
            },      
    },
    ]
    function setCanvasImages(){
        let imgElem1;
        for (let i=0;i<sceneInfo[1].objs.imagesPath.length;i++){
            imgElem1=new Image();
            imgElem1.src=sceneInfo[1].objs.imagesPath[i];
            sceneInfo[1].objs.images.push(imgElem1);
        };
        let imgElem2;
        for (let i=0;i<sceneInfo[2].objs.imagesPath.length;i++){
            imgElem2=new Image();
            imgElem2.src=sceneInfo[2].objs.imagesPath[i];
            sceneInfo[2].objs.images.push(imgElem2);
        };
        
        let imgElem3;
        for(let i=0;i<sceneInfo[3].values.videImageCount;i++){
            imgElem3=document.createElement('img');
            imgElem3.src=`./videoimgs/04_1/Frame_${00000+i}.bmp`;
            sceneInfo[3].objs.videoImages.push(imgElem3);
        }
        for(let i=0;i<sceneInfo[3].values.videImageCount;i++){
            imgElem3=document.createElement('img');
            imgElem3.src=`./videoimgs/04_2/Frame_${00000+i}.bmp`;
            sceneInfo[3].objs.videoImages.push(imgElem3);
        }
        for(let i=0;i<sceneInfo[3].values.videImageCount;i++){
            imgElem3=document.createElement('img');
            imgElem3.src=`./videoimgs/04_3/Frame_${00000+i}.bmp`;
            sceneInfo[3].objs.videoImages.push(imgElem3);
        }
        
        for (let i=0;i<sceneInfo[3].objs.imagesPath.length;i++){
            imgElem3=new Image();
            imgElem3.src=sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        };
        
        let imgElem4;
        for (let i=0;i<sceneInfo[4].objs.imagesPath.length;i++){
            imgElem4=new Image();
            imgElem4.src=sceneInfo[4].objs.imagesPath[i];
            sceneInfo[4].objs.images.push(imgElem4);
        };
        
        let imgElem5;
        for (let i=0;i<sceneInfo[5].objs.imagesPath.length;i++){
            imgElem5=new Image();
            imgElem5.src=sceneInfo[5].objs.imagesPath[i];
            sceneInfo[5].objs.images.push(imgElem5);
        };
        let imgElem6;
        for (let i=0;i<sceneInfo[6].objs.imagesPath.length;i++){
            imgElem6=new Image();
            imgElem6.src=sceneInfo[6].objs.imagesPath[i];
            sceneInfo[6].objs.images.push(imgElem6);
        };

    }
    
    setCanvasImages();
    
    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for (let i=0 ; i<sceneInfo.length;i++){
            
            if(sceneInfo[i].type==='sticky'){
                sceneInfo[i].scrollHeight=sceneInfo[i].heightNum*window.innerHeight;
                sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`; 
            } else if(sceneInfo[i].type==='normal'){
                sceneInfo[i].scrollHeight=sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`
        }
        
        yOffset=window.pageYOffset;
        let totalScrollHeight=0;
        for (let i=0; i<sceneInfo.length;i++){ //새로고침시 지금 보고있는 current scene 잡아보기
            totalScrollHeight+=sceneInfo[i].scrollHeight;
            if(totalScrollHeight>= yOffset){
               currentScene=i;
               break;
           }
        };
        
        // 초반에 흰색배경-> 검은 배경
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        if(currentScene===0){
            document.body.style.background= `rgba(0,0,0,${calcValues(sceneInfo[0].values.white_theme_out,yOffset-prevScrollHeight)})`;
        }else{
            document.body.style.background=`rgba(0,0,0,1)`;
        }
        if(currentScene!=0){
            document.querySelector('.vertical-sidebar').style.display='block';
        }
                
        sceneInfo[1].objs.context1.drawImage(sceneInfo[1].objs.images[0],0,0);
        sceneInfo[1].objs.context2.drawImage(sceneInfo[1].objs.images[1],0,0);
        sceneInfo[1].objs.context3.drawImage(sceneInfo[1].objs.images[2],0,0);
        sceneInfo[1].objs.context4.drawImage(sceneInfo[1].objs.images[3],0,0);
        
        sceneInfo[2].objs.context1.drawImage(sceneInfo[2].objs.images[0],0,0);
        sceneInfo[2].objs.context2.drawImage(sceneInfo[2].objs.images[1],0,0);
        sceneInfo[2].objs.context3.drawImage(sceneInfo[2].objs.images[2],0,0);
        sceneInfo[2].objs.context4.drawImage(sceneInfo[2].objs.images[3],0,0);

        sceneInfo[3].objs.context1.drawImage(sceneInfo[3].objs.images[0],0,0);        
        
        
        sceneInfo[4].objs.context1.drawImage(sceneInfo[4].objs.images[0],0,0);
        sceneInfo[4].objs.context2.drawImage(sceneInfo[4].objs.images[1],0,0);
        sceneInfo[4].objs.context3.drawImage(sceneInfo[4].objs.images[2],0,0);
        sceneInfo[4].objs.context4.drawImage(sceneInfo[4].objs.images[3],0,0);
        
        sceneInfo[5].objs.context2.drawImage(sceneInfo[5].objs.images[0],0,0);
        
        sceneInfo[6].objs.context1.drawImage(sceneInfo[6].objs.images[0],0,0);
        // scroll progress 구현 위한 전체 길이 
        totalHeight=0;
        for(let i = 0 ;i<sceneInfo.length;i++){
            totalHeight+=sceneInfo[i].scrollHeight;
        };
        totalHeight-=window.innerHeight;
        
        
        //캔버스 크기 맞추기 
        widthRatio=window.innerWidth/sceneInfo[1].objs.canvas1.width;
        widthRatio_reduced=(window.innerWidth-300)/sceneInfo[1].objs.canvas1.width;
        const heightRatio= window.innerHeight/sceneInfo[1].objs.canvas1.height;
        if(widthRatio<=heightRatio){
            // 캔버스보다 브라우저 창이 홀쭉한 경우 
            canvasScaleRatio=heightRatio;
        } else{
            // 캔버스보다 브라우저 창이 넓은 경우
            canvasScaleRatio=widthRatio;
        }        
        
        sceneInfo[0].objs.img1.style.transform=`translateX(-50%) scale(${heightRatio})`;
        sceneInfo[0].objs.img2.style.transform=`translateX(-50%) scale(${widthRatio})`;
        
        sceneInfo[1].objs.canvas1.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[1].objs.canvas2.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[1].objs.canvas3.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[1].objs.canvas4.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        
        sceneInfo[2].objs.canvas1.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[2].objs.canvas2.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[2].objs.canvas3.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[2].objs.canvas4.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        
        sceneInfo[3].objs.videoCanvas.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[3].objs.canvas1.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio/1.5})`;
        
        
        sceneInfo[4].objs.canvas1.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[4].objs.canvas2.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[4].objs.canvas3.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[4].objs.canvas4.style.transform=`translate3d(-50%,-50%,0) scale(${canvasScaleRatio})`;
        sceneInfo[4].objs.canvas5.style.transform=`scale(${canvasScaleRatio})`;
        
        
        //5번 애들만 예외로 widthRatio에 맞춘다. 
        
        // 이 긴 이미지 정확히 끝나는 부분까지만 translate Y 되도록 계산 
        let transYLongImage=(2160*widthRatio_reduced-window.innerHeight)/(2160)*100;
        (()=>{
            sceneInfo[5].values.canvas2_translateY_scroll[1]=-1*transYLongImage;
            sceneInfo[5].values.canvas2_translateY_out[0]=-1*transYLongImage;
        })();
        
        
        
        
        //s6의 첫 이미지 확대 순간 맞추기
        sceneInfo[6].values.canvas1_scale_in[0]=widthRatio;
        
        sceneInfo[6].values.canvas1_translateY_in[0]= (-sceneInfo[6].objs.canvas1.height+1260)*widthRatio;
        sceneInfo[6].values.canvas1_translateY_in[1]= 50;
        //여기 transform initial value 필요
        
    };
    
    
    function playAnimation(){
        const values=sceneInfo[currentScene].values;
        const objs=sceneInfo[currentScene].objs;
        const currentYOffset=yOffset-prevScrollHeight;//지금 scene 에서 스크롤 된 양.
        const scrollHeight=sceneInfo[currentScene].scrollHeight;
        const scrollRatio= currentYOffset/scrollHeight;
        
//        console.log(currentScene,scrollRatio);
        switch(currentScene){
                
                
            case 0:
                objs.body.style.background= `rgba(0,0,0,${calcValues(values.white_theme_out,currentYOffset)})`;
                if(scrollRatio<=0.3){
                    for(i=0;i<objs.barItems.length;i++){
                        objs.barItems[i].style.height=`1.2rem`;
                    }
                }else if(scrollRatio<=0.8){
                    for(i=0;i<objs.barItems.length;i++){
                objs.barItems[i].style.height=`10vh`;
                    }
                 }else{
                     for(i=0;i<objs.barItems.length;i++){
                objs.barItems[i].style.height=`1.2rem`;
                     }
                 }
                if(scrollRatio<=0.45){
                    objs.subMessage.innerHTML="Engineering, Architecture, Scripting enthusiast";
                    
                }else{
                    objs.subMessage.innerHTML="These are the projects / skillsets will be shown on this website.";
                }
                    
                if(scrollRatio<=0.5){
                    objs.title.style.opacity=1;

                }else{
                    objs.title.style.opacity=calcValues(values.title_opacity_out,currentYOffset);
                    
                }
                if(currentYOffset>=window.innerHeight){
                    objs.title.style.position="absolute";
                    objs.title.style.top=`${window.innerHeight+43}px`;
                }else{
                    objs.title.classList.add('sticky-elem');
                    objs.title.style.position="fixed";
                    objs.title.style.top=`${43}px`;
                }
                if(scrollRatio<0.9){
                    objs.sidebar.style.display='none';

                }else{
                    objs.sidebar.style.display='block';
                }
                break;
                
                
            case 1:
                
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                //sidebar 
                if(scrollRatio<values.canvas4_opacity_in[2].start){
                    document.body.classList.add('black-sidebar');
                }else{
                    document.body.classList.remove('black-sidebar');
                }
                
                if(scrollRatio<=0.125){
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_in,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionA.style.opacity=0
                    
                }else{
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_out,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionA.style.opacity=1
                }
                if(scrollRatio<=0.375){
                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_in,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                                        
                    objs.descriptionB.style.opacity=0;
                }else{
                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_out,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionB.style.opacity=1;
                    
                }
                if(scrollRatio<=0.625){
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_in,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionC.style.opacity=0;
                    
                }else{
                    
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_out,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionC.style.opacity=1;
                }
                if(scrollRatio<=0.8){

                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_in,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionD.style.opacity=0;
                    
                }else{
                    
                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_out,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionD.style.opacity=1;
                    
                }
                if(scrollRatio<=values.canvas4_opacity_in[2].start){
                    objs.messageA.style.color="white";
                }else{
                    objs.messageA.style.color="black";
                }
                
                break;
            case 2:
                // village project
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                
                
                if(scrollRatio<=0.125){
                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_in,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    
                    objs.descriptionA.style.opacity=0;
                }else{
                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_out,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    
                    objs.descriptionA.style.opacity=1;
                }
                if(scrollRatio<=0.375){

                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_in,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    
                    objs.descriptionB.style.opacity=0;
                }else{
                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_out,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionB.style.opacity=1;
                }
                if(scrollRatio<=0.625){
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_in,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    
                }else{
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_out,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    
                }
				if (scrollRatio <= 0.625) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    
					objs.messageC2.style.transform = `translate3d(${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0,0)`;
					objs.messageC2.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC2.style.transform = `scaleX(${calcValues(values.pinC2_scaleY, currentYOffset)})`;
                    
					objs.messageC3.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC3.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC3.style.transform = `scaleY(${calcValues(values.pinC3_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    
					objs.messageC2.style.transform = `translate3d(${calcValues(values.messageC_translateY_out, currentYOffset)}%,0, 0)`;
					objs.messageC2.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC2.style.transform = `scaleX(${calcValues(values.pinC2_scaleY, currentYOffset)})`;
                    
					objs.messageC3.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC3.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC3.style.transform = `scaleY(${calcValues(values.pinC3_scaleY, currentYOffset)})`;
                    
                    
                    
				}
                
                if(scrollRatio<=0.8){
                    
                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_in,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionC.style.opacity=0;
                    
                }else{
                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_out,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    objs.descriptionC.style.opacity=1;
                    
                }
                if (scrollRatio<=values.canvas2_opacity_in[2].start || scrollRatio>=values.canvas4_opacity_in[2].start){
                    objs.messageA.style.color="white";
                }else{
                    objs.messageA.style.color="rgb(29,29,31)";
                }
                
                
                
                break;
                
            case 3:
                
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                
//                let sequence= Math.round(calcValues(values.imageSequence,currentYOffset));
//                objs.videoContext.drawImage(objs.videoImages[sequence],0,0);
                objs.videoCanvas.style.opacity=calcValues(values.canvas_opacity,currentYOffset);
                
                
				if (scrollRatio <= 0.05) {
                    
                    objs.descriptionA.style.opacity=0;
				} else {
                    
                    objs.descriptionA.style.opacity=1;

				}
                
				if (scrollRatio <= 0.18) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}
                
				if (scrollRatio <= 0.35) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}
                if (scrollRatio<=0.7){
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_in,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio/1.5})`;
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                }else{
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_out,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio/1.5})`;
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                if (scrollRatio<=0.9){
                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_in,currentYOffset);
                    
                    objs.descriptionB.style.opacity=0;
                }else{
                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_out,currentYOffset);
                    
                    objs.descriptionB.style.opacity=1;
                }

                

                break;
            case 4:
                // manifest differentials
                
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                
                if(scrollRatio<=0.125){
                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_in,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionA.style.opacity=0;
                }else{
                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_out,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas1_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionA.style.opacity=1;
                    
                }
                if(scrollRatio<=0.375){

                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_in,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionB.style.opacity=0;
                    
                }else{

                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_out,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas2_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionB.style.opacity=1;
                }
                if(scrollRatio<=0.625){
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_in,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;

                    objs.descriptionC.style.opacity=0;
                }else{
                    objs.canvas3.style.opacity=calcValues(values.canvas3_opacity_out,currentYOffset);
                    objs.canvas3.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas3_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                    
                    objs.descriptionC.style.opacity=1;
                }
                if(scrollRatio<=0.875){
                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_in,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_in, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                }else{
                    objs.canvas4.style.opacity=calcValues(values.canvas4_opacity_out,currentYOffset);
                    objs.canvas4.style.transform=`translate3d(-50%, ${-50+calcValues(values.canvas4_translateY_out, currentYOffset)}%, 0) scale(${canvasScaleRatio})`;
                }
                if(scrollRatio<=0.875){
                    objs.canvas5.style.display="none";
                
                }else if(scrollRatio<=0.975){
                    objs.canvas5.style.display="block";
                    objs.canvas5.style.opacity=calcValues(values.canvas5_opacity_out,currentYOffset);
                }
                else{
                    objs.canvas5.style.display="none";
                }
                
                break;
            case 5:
                //ML with navy
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                
                
                if(scrollRatio<=0.125){
                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_in,currentYOffset);

                    objs.canvas1.style.transform=`translate3d(0, ${calcValues(values.canvas1_translateY_in, currentYOffset)}%, 0)`;
                    
                    
                    objs.descriptionA.style.opacity=0;
                }else{

                    objs.messageA.style.opacity= calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.canvas1.style.opacity=calcValues(values.canvas1_opacity_out,currentYOffset);
                    objs.canvas1.style.transform=`translate3d(0, ${calcValues(values.canvas1_translateY_out, currentYOffset)}%, 0)`;
                    
                    objs.descriptionA.style.opacity=1;
                }
                if(scrollRatio<=0.3){

                    objs.canvas2.style.opacity=calcValues(values.canvas2_opacity_in,currentYOffset);
                    objs.canvas2.style.transform=`translate3d(-50%, ${calcValues(values.canvas2_translateY_in, currentYOffset)}%, 0) scale(${widthRatio_reduced})`;
                    
                    objs.descriptionB.style.opacity=0;
                    objs.descriptionC.style.opacity=0;
                }else if(scrollRatio<=0.45){
                    objs.canvas2.style.opacity=1;
                    objs.canvas2.style.transform=`translate3d(-50%, ${calcValues(values.canvas2_translateY_scroll, currentYOffset)}%, 0) scale(${widthRatio_reduced})`;
                    
                    objs.descriptionB.style.opacity=1;
                    
                }else{
                    objs.canvas2.style.transform=`translate3d(-50%, ${calcValues(values.canvas2_translateY_out, currentYOffset)}%, 0) scale(${widthRatio_reduced})`;
                    
                    objs.descriptionC.style.opacity=1;
                }
                
                if(scrollRatio>= values.canvas2_translateY_out[2].start){
                    document.querySelector('.whole_website').id="force_show";
                    if(true){
                        sceneInfo[6].objs.canvas1.style.transform=`translate3d(-50%, ${(-sceneInfo[6].objs.canvas1.height+1260)*widthRatio}px,0) scale(${widthRatio})`;
                    }
                
                }else{
                    document.querySelector('.whole_website').id="force_hide";
                }
                          
                break;
            case 6:
                //this website
                objs.menuPin.style.transform = `scaleY(${scrollRatio})`;
                if(scrollRatio<=0.05){
                    objs.descriptionA.style.opacity=0;
                }else{
                    objs.descriptionA.style.opacity=1;
                }
                if(scrollRatio<=0.35){
                    objs.descriptionB.style.opacity=0;
                }else{
                    objs.descriptionB.style.opacity=1;
                }
                if(true){
                    objs.canvas1.style.transform=`translate3d(${calcValues(values.canvas1_translateX_in,currentYOffset)}%, ${calcValues(values.canvas1_translateY_in,currentYOffset)}px,0) scale(${calcValues(values.canvas1_scale_in,currentYOffset)})`;
                    
                }
                if(scrollRatio>=values.final_message_height[2].start){
                    objs.finalMessage.style.height=`${calcValues(values.final_message_height,currentYOffset)}rem`;
                    for(i=0;i<objs.lifedItems.length;i++){
                        objs.lifedItems[i].style.top=`${-calcValues(values.final_message_height,currentYOffset)}rem`;
                    }
                }else{
                    objs.finalMessage.style.height=0;
                    for(i=0;i<objs.lifedItems.length;i++){
                        objs.lifedItems[i].style.top=0;
                    }
                }
                break;
                
        };
    };
    
    var didScroll;
    var lastScrollTop=0;
    var delta=5; 
    var offsetObj=document.querySelectorAll('.messageA');
    function hasScrolled(){
        var currentSt=window.pageYOffset;
        
        if (currentSt>lastScrollTop && currentSt>1.5*window.innerHeight){
            // currently scrolling down
            for(let i=0;i<offsetObj.length;i++){
                var item= offsetObj.item(i);
                item.classList.remove('offset');
            }
            
        }else{
            //scroll up
            
            for(let i=0;i<offsetObj.length;i++){
                var item= offsetObj.item(i);
                item.classList.add('offset');
            }

            
        }
        lastScrollTop=currentSt;
    }
    setInterval(function(){
        if(didScroll){
            hasScrolled();
            didScroll=false;
        }
    },250);
    
    function scrollLoop(){
        enterNewScene=false;
        prevScrollHeight=0;
        for(let i=0 ; i<currentScene;i++){
            prevScrollHeight+=sceneInfo[i].scrollHeight;
        }
        
        // !TODO: 여기에다가 enter new scene 하면 scroll 1px 하는거 넣어서 오류 잡자. 
        if(yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight){
            enterNewScene=true;
            currentScene++;
            console.log(`enterscene${currentScene}`);
            document.body.setAttribute('id',`show-scene-${currentScene}`);
            
            scroll({top:window.pageYOffset+2,behavior:"smooth"});
            
        }
        if(yOffset < prevScrollHeight){
            enterNewScene=true;
            if(currentScene==0) return; //모바일 바운스 동작시 마이너스 되는 것 방지 
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
            
        };
        if(enterNewScene) return;        
        
        playAnimation();
        setProgressBar();
        didScroll=true;
        
    };
    function calcValues(values,currentYOffset){
            let rv;
            const scrollHeight=sceneInfo[currentScene].scrollHeight;
            let scrollRatio=currentYOffset/scrollHeight;
            if(values.length===3){
               //start end 사이에 애니메이션 실행
                const partScrollStart=values[2].start*scrollHeight;
                const partScrollEnd=values[2].end*scrollHeight;
                const partScrollHeight=partScrollEnd-partScrollStart;
                if(currentYOffset>=partScrollStart && currentYOffset<=partScrollEnd){
                    rv= (currentYOffset-partScrollStart)/partScrollHeight* (values[1]-values[0])+values[0];
                } 
                else if(currentYOffset<partScrollStart){
                    rv=values[0];
                } 
                else if(currentYOffset>partScrollEnd){
                    rv=values[1];
                }  
           }else{
               rv= scrollRatio* (values[1]-values[0])+values[0];
           }
            return rv;    
    };

    function setProgressBar(){
        totalScrollRatio= window.pageYOffset/totalHeight;
        let bar= document.querySelector(`.progress_bar`);
        ////          vertical version
        //        bar.style.height=`${window.innerHeight*totalScrollRatio}px`;
        bar.style.width=`${window.innerWidth*totalScrollRatio}px`;
    }
    

    function setNav(){
        let navObjs= window.document.querySelectorAll('nav a');
        for (let i = 0; i<navObjs.length;i++){
            navObjs[i].addEventListener('click',function(e){
                if(this.hash !== ''){
                    e.preventDefault();
                    var hash = this.hash;
                    var firstImgOffset=0
                    switch(hash){
                        case '#s0':
                            break;
                        case '#s1':
                            firstImgOffset=sceneInfo[1].scrollHeight*sceneInfo[1].values.canvas1_opacity_in[2].end;
                            break;
                        case '#s2':
                            firstImgOffset=sceneInfo[2].scrollHeight*sceneInfo[2].values.canvas1_opacity_in[2].end;
                            break;
                        case '#s3':
                            firstImgOffset=sceneInfo[3].scrollHeight*sceneInfo[3].values.imageSequence[2].start;
                            break;
                        case '#s4':
                            firstImgOffset=sceneInfo[4].scrollHeight*sceneInfo[4].values.canvas1_opacity_in[2].end;
                            break;
                            
                    }
                    var scroll_amount= window.pageYOffset+document.querySelector(hash).getBoundingClientRect().top+firstImgOffset;
                    scroll({top:scroll_amount,behavior:"smooth"});
                    window.setTimeout(()=>{
                        setLayout();
                        playAnimation();},1);
                };
            });
        };
    }
    
    var x=0;
    function smoothScroll(scrollStart,scrollEnd){
        var increment=0
        var timeId= setInterval(function(){
            window.scrollBy(0,increment);
            increment=increment+1;
        },1);
        if(Math.abs(increment)>=Math.abs(scrollEnd-scrollStart)){
        clearInterval(timeId);};
    }
    
    
    
    
    function loop(){
        delayedYOffset=delayedYOffset+(yOffset-delayedYOffset)*acc;
        
        if(!enterNewScene){

            if(currentScene===3){
                const currentYOffset=delayedYOffset-prevScrollHeight;
                const values=sceneInfo[currentScene].values;
                const objs=sceneInfo[currentScene].objs;
                
                let sequence= Math.round(calcValues(values.imageSequence,currentYOffset));
                if(objs.videoImages[sequence]){
                    objs.videoContext.drawImage(objs.videoImages[sequence],0,0);
                }
            }
        }
        rafId=requestAnimationFrame(loop);
        if(Math.abs(yOffset-delayedYOffset)<1){
            cancelAnimationFrame(rafId);
            rafState=false;
        }
    }
    var items=document.querySelectorAll('bar-item');
    for(i=0; i<items.length;i++){
        items[i].addEventListener("mouse")
    }
    
    window.addEventListener('DOMContentLoaded',()=>{
        
    });
    window.addEventListener('load',()=>{
        document.body.classList.remove('before-load');
        document.querySelector('.loading').addEventListener('transitionend',(e)=>{
           document.body.removeChild(e.currentTarget); 
        });
        setNav();
        setLayout();
        window.addEventListener('scroll',()=>{
        yOffset=window.pageYOffset;
        scrollLoop();
            
        if(!rafState){
            rafId =requestAnimationFrame(loop);
            rafState=true;
           };
            
            
        });
        window.addEventListener('resize',()=>{
            setLayout();
            setProgressBar();
        });
        window.addEventListener('refresh',()=>{
            setLayout();
            setProgressBar();
        });
    });
    
})();