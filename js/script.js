 // Elements
    const gradientDisplay = document.getElementById('gradientDisplay');
    const colorInputs = document.getElementById('colorInputs');
    const addColorBtn = document.getElementById('addColorBtn');
    const gradientType = document.getElementById('gradientType');
    const direction = document.getElementById('direction');
    const angleInput = document.getElementById('angleInput');
    const radialOptions = document.getElementById('radialOptions');
    const radialShape = document.getElementById('radialShape');
    const radialPosition = document.getElementById('radialPosition');
    const cssOutput = document.getElementById('cssOutput');
    const copyBtn = document.getElementById('copyBtn');

    // Initial colors
    let colors = [
      { value: '#4a6cf7' },
      { value: '#f953c6' }
    ];

    // Update gradient
    function updateGradient() {
      let gradientCSS = '';
      
      // Get all colors with their stops
      const colorValues = Array.from(document.querySelectorAll('.color-input input[type="text"]'))
        .map(input => input.value);
      
      if (gradientType.value === 'linear') {
        // Linear gradient
        if (direction.value.includes('deg')) {
          gradientCSS = `linear-gradient(${direction.value}, ${colorValues.join(', ')})`;
        } else {
          gradientCSS = `linear-gradient(${direction.value}, ${colorValues.join(', ')})`;
        }
      } else if (gradientType.value === 'radial') {
        // Radial gradient
        gradientCSS = `radial-gradient(${radialShape.value} at ${radialPosition.value}, ${colorValues.join(', ')})`;
      } else if (gradientType.value === 'conic') {
        // Conic gradient
        gradientCSS = `conic-gradient(from 0deg at center, ${colorValues.join(', ')})`;
      }
      
      // Apply gradient to display
      gradientDisplay.style.background = gradientCSS;
      
      // Update CSS output
      cssOutput.value = `background: ${gradientCSS};`;
    }

    // Add color input
    function addColorInput() {
      if (colorInputs.children.length >= 5) return; // Limit to 5 colors
      
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      const newIndex = colorInputs.children.length;
      
      const colorInputDiv = document.createElement('div');
      colorInputDiv.className = 'color-input';
      colorInputDiv.innerHTML = `
        <input type="color" value="${randomColor}" data-index="${newIndex}">
        <input type="text" value="${randomColor}" data-index="${newIndex}">
        <button class="remove-color">✕</button>
      `;
      
      colorInputs.appendChild(colorInputDiv);
      
      // Add event listeners to new inputs
      const colorPicker = colorInputDiv.querySelector('input[type="color"]');
      const colorText = colorInputDiv.querySelector('input[type="text"]');
      const removeBtn = colorInputDiv.querySelector('.remove-color');
      
      colorPicker.addEventListener('input', function() {
        colorText.value = this.value;
        updateGradient();
      });
      
      colorText.addEventListener('input', function() {
        colorPicker.value = this.value;
        updateGradient();
      });
      
      removeBtn.addEventListener('click', function() {
        colorInputDiv.remove();
        updateGradient();
      });
      
      updateGradient();
    }

    // Initialize
    function initEventListeners() {
      // Color input 
      colorInputs.addEventListener('input', function(e) {
        if (e.target.type === 'color') {
          const index = e.target.dataset.index;
          const textInput = document.querySelector(`input[type="text"][data-index="${index}"]`);
          textInput.value = e.target.value;
        } else if (e.target.type === 'text') {
          const index = e.target.dataset.index;
          const colorInput = document.querySelector(`input[type="color"][data-index="${index}"]`);
          colorInput.value = e.target.value;
        }
        updateGradient();
      });
      
      // Add color button
      addColorBtn.addEventListener('click', addColorInput);
      
      // Gradient type change
      gradientType.addEventListener('change', function() {
        if (this.value === 'linear') {
          direction.style.display = '';
          angleInput.style.display = 'none';
          radialOptions.style.display = 'none';
        } else if (this.value === 'radial') {
          direction.style.display = 'none';
          angleInput.style.display = 'none';
          radialOptions.style.display = '';
        } else if (this.value === 'conic') {
          direction.style.display = 'none';
          angleInput.style.display = 'none';
          radialOptions.style.display = 'none';
        }
        updateGradient();
      });
      
      // Direction 
      direction.addEventListener('change', updateGradient);
      angleInput.addEventListener('input', updateGradient);
      
      // Radial 
      radialShape.addEventListener('change', updateGradient);
      radialPosition.addEventListener('change', updateGradient);
      
      // Copy to Code
      copyBtn.addEventListener('click', function() {
        cssOutput.select();
        document.execCommand('copy');
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = 'Copy to Clipboard';
        }, 2000);
      });
    }

    // Initialize
    function init() {
      initEventListeners();
      updateGradient();
    }

   
    init();