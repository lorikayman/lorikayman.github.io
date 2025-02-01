#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;

vec4 applyGamma(vec4 color, float gamma) {
  color.x = pow(color.r, gamma);
  color.y = pow(color.g, gamma);
  color.z = pow(color.b, gamma);
  return color;
}

vec4 applyOpacity(vec4 color, float opacity) {
  color.a = pow(color.a, opacity);
  return color;
}

vec4 applyOpacityGradient(vec4 color, float t, float minAlpha, float maxAlpha) {
    // Interpolate the alpha value
    float alpha = mix(minAlpha, maxAlpha, t);
    // Set the new alpha to the color
    color.a = alpha;
    return color;
}


void main(void) {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Center coordinates
  vec2 center = vec2(0.5, 0.5);
  vec2 toCenter = uv - center;

  // Radial Gradient
  float dist = length(toCenter) / 0.71;
  float radialAlpha = smoothstep(1.0, 0.0, dist);
  
  vec4 radialColor = vec4(
    52.0 / 255.0,
    100.0 / 255.0,
    255.0 / 255.0,
    0.12
  );
  float radialOpacity = radialColor.w * radialAlpha;

  // Linear Gradient
  float angle = radians(210.0); // Convert angle to radians
  vec2 directionAngle = vec2(cos(angle), sin(angle));
  float directionGradient = dot(uv, directionAngle);

  // vec3 gradientStart = vec3(
  //   77.0 / 255.0,
  //   169.0 / 255.0,
  //   255.0 / 255.0
  // );
  // vec3 gradientEnd = vec3(
  //   61.0 / 255.0,
  //   81.0 / 255.0,
  //   255.0 / 255.0
  // );

  vec4 gradientStart = vec4(
    77.0 / 255.0,
    169.0 / 255.0,
    255.0 / 255.0,
    0.14
  );

  vec4 gradientEnd = vec4(
    161.0 / 255.0,
    181.0 / 255.0,
    255.0 / 255.0,
    0.12
  );

  vec4 colorGradient = mix(
    gradientStart,
    gradientEnd,
    directionGradient
  );
  // vec4 applied = applyOpacityGradient(colorGradient, directionGradient, gradientStart.a, gradientEnd.a);
  float opacityGradient = mix(gradientStart.a, gradientEnd.a, directionGradient);
  vec4 finalColor = applyGamma(colorGradient * opacityGradient + radialColor * radialOpacity, 2.2);
  // vec4 finalColor = colorGradient + radialColor;

  gl_FragColor = finalColor;
}
