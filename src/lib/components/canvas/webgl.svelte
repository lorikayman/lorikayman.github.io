<script>
  import { onMount } from 'svelte'

  const {
    controlClasses
    // shaderFragmentSource,
    // shaderVertexSource,
  } = $props()

  import initialShaderFragmentSource from '$lib/entries/sk/components/shaders/fragment.glsl'

  import initialShaderVertexSource from '$lib/entries/sk/components/shaders/vertex.glsl'

  let canvas

  onMount(() => {
    console.log('onMount glsl:', controlClasses)
    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // Compile shaders
    const vertexShader = loadShader(
      gl,
      gl.VERTEX_SHADER,
      initialShaderVertexSource
    )
    const fragmentShader = loadShader(
      gl,
      gl.FRAGMENT_SHADER,
      initialShaderFragmentSource
    )

    // Link shaders into a program
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // Check for linking errors
    if (
      !gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)
    ) {
      console.error(
        'Unable to initialize the shader program: ' +
          gl.getProgramInfoLog(shaderProgram)
      )
      return
    }

    gl.useProgram(shaderProgram)

    // Set up a full-screen quad
    const vertices = new Float32Array([
      -1.0,
      -1.0, // Bottom-left
      1.0,
      -1.0, // Bottom-right
      -1.0,
      1.0, // Top-left
      1.0,
      1.0 // Top-right
    ])

    const positionAttributeLocation = gl.getAttribLocation(
      shaderProgram,
      'aPosition'
    )
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      vertices,
      gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(
      positionAttributeLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    )

    // Pass the resolution to the shader
    const resolutionUniformLocation = gl.getUniformLocation(
      shaderProgram,
      'uResolution'
    )
    gl.uniform2f(
      resolutionUniformLocation,
      canvas.width,
      canvas.height
    )

    // Draw the full-screen quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  })

  function loadShader (gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        'An error occurred compiling the shaders: ' +
          gl.getShaderInfoLog(shader)
      )
      gl.deleteShader(shader)
      return null
    }

    return shader
  }
</script>

<canvas bind:this={canvas} class={controlClasses}></canvas>
