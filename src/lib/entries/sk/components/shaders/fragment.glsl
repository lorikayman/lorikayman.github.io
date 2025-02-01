precision mediump float;

uniform vec2 uResolution;

void main(void) {
    vec2 uv = gl_FragCoord.xy / uResolution;

    // Center coordinates
    vec2 center = vec2(0.5, 0.5);
    vec2 toCenter = uv - center;

    // Radial Gradient
    float dist = length(toCenter) / 0.71;
    float radialAlpha = smoothstep(1.0, 0.0, dist);

    vec3 radialColorRgb = vec3(52.0 / 255.0, 100.0 / 255.0, 255.0 / 255.0);
    float radialOpacity = 0.12 * radialAlpha;




    // Linear Gradient
    float angle = radians(210.0); // Convert angle to radians
    vec2 direction = vec2(cos(angle), sin(angle));

    float linearProgress = dot(uv, direction);

    vec3 gradientStart = vec3(
      77.0 / 255.0,
      169.0 / 255.0,
      255.0 / 255.0
    );
    vec3 gradientEnd = vec3(
      61.0 / 255.0,
      81.0 / 255.0,
      255.0 / 255.0
    );

    float linearAlpha = mix(0.14, 0.2, linearProgress);

    vec3 linearColor = mix(gradientStart, gradientEnd, linearProgress);

    // --------------------
    // Combine Gradients
    // --------------------
    vec3 finalColor = linearColor * 1.0;

    gl_FragColor = vec4(finalColor, 1.0);
}
