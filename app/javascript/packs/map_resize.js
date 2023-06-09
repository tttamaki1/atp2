document.addEventListener('turbolinks:load', function() {

   if (document.querySelector('.generated-plan-container')) {
      if (!window.matchMedia("(max-width: 600px)").matches) {
          const generatedPlanContainer = document.querySelector('.generated-plan-container');
          const rightSideContainer = document.querySelector('.right-side-container'); 
          const mapContainer = document.querySelector('.map-container'); 
          const indexContainer = document.querySelector('.container-index'); 

          function adjustWidth() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let calculatedWidth;

            indexContainer.style.width = `${viewportWidth}px`;

            // console.log(`viewportWidth:${viewportWidth} viewportHeight:${viewportHeight}`)
            if (viewportWidth >= 1350) {
              generatedPlanContainer.style.width = `${viewportWidth * 0.4}px`;
              calculatedWidth = viewportWidth - (viewportWidth * 0.4) - 400;
              
            } else {
              calculatedWidth = viewportWidth - generatedPlanContainer.style.width - 400;
              if (generatedPlanContainer == null) {
                generatedPlanContainer.style.width = '400px';
              }
            }

            calculatedHeight = viewportHeight - 220; // 62 + 50 + 50 + 40 + 18 = 220
            rightSideContainer.style.height = `${calculatedHeight}px`;

            mapContainer.style.width = `${calculatedWidth - 40}px`;
            rightSideContainer.style.width = `${calculatedWidth}px`;
        
          //  console.log(rightSideContainer.style.width);
          }
        
          // ブラウザの幅が変わった時に実行
          window.addEventListener('resize', adjustWidth);
        
          // 初期表示時に一度実行
          adjustWidth();
          }  
      }
  });
  