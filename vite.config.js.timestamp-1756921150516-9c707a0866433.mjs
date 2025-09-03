// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        "como-funciona": resolve(__vite_injected_original_dirname, "pages/como-funciona.html"),
        "red-servicios": resolve(__vite_injected_original_dirname, "pages/red-servicios.html"),
        "planes": resolve(__vite_injected_original_dirname, "pages/planes.html"),
        "productos": resolve(__vite_injected_original_dirname, "pages/productos.html"),
        "contacto": resolve(__vite_injected_original_dirname, "pages/contacto.html"),
        "tutoriales": resolve(__vite_injected_original_dirname, "pages/tutoriales.html"),
        "telemandos": resolve(__vite_injected_original_dirname, "pages/telemandos.html"),
        "faq": resolve(__vite_injected_original_dirname, "pages/faq.html"),
        "privacidad": resolve(__vite_injected_original_dirname, "pages/privacidad.html"),
        "terminos": resolve(__vite_injected_original_dirname, "pages/terminos.html"),
        "llaves": resolve(__vite_injected_original_dirname, "pages/llaves.html"),
        "carcasas": resolve(__vite_injected_original_dirname, "pages/carcasas.html"),
        "accesorios": resolve(__vite_injected_original_dirname, "pages/accesorios.html")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@admin": resolve(__vite_injected_original_dirname, "src/admin")
    }
  },
  server: {
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICAgICdjb21vLWZ1bmNpb25hJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWdlcy9jb21vLWZ1bmNpb25hLmh0bWwnKSxcbiAgICAgICAgJ3JlZC1zZXJ2aWNpb3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhZ2VzL3JlZC1zZXJ2aWNpb3MuaHRtbCcpLFxuICAgICAgICAncGxhbmVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWdlcy9wbGFuZXMuaHRtbCcpLFxuICAgICAgICAncHJvZHVjdG9zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWdlcy9wcm9kdWN0b3MuaHRtbCcpLFxuICAgICAgICAnY29udGFjdG8nOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhZ2VzL2NvbnRhY3RvLmh0bWwnKSxcbiAgICAgICAgJ3R1dG9yaWFsZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhZ2VzL3R1dG9yaWFsZXMuaHRtbCcpLFxuICAgICAgICAndGVsZW1hbmRvcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFnZXMvdGVsZW1hbmRvcy5odG1sJyksXG4gICAgICAgICdmYXEnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhZ2VzL2ZhcS5odG1sJyksXG4gICAgICAgICdwcml2YWNpZGFkJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWdlcy9wcml2YWNpZGFkLmh0bWwnKSxcbiAgICAgICAgJ3Rlcm1pbm9zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWdlcy90ZXJtaW5vcy5odG1sJyksXG4gICAgICAgICdsbGF2ZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhZ2VzL2xsYXZlcy5odG1sJyksXG4gICAgICAgICdjYXJjYXNhcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFnZXMvY2FyY2FzYXMuaHRtbCcpLFxuICAgICAgICAnYWNjZXNvcmlvcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFnZXMvYWNjZXNvcmlvcy5odG1sJyksXG4gICAgICB9XG4gICAgfVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICdAYWRtaW4nOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hZG1pbicpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiB0cnVlXG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLGVBQWU7QUFEeEIsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUNyQyxpQkFBaUIsUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxRQUM5RCxpQkFBaUIsUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxRQUM5RCxVQUFVLFFBQVEsa0NBQVcsbUJBQW1CO0FBQUEsUUFDaEQsYUFBYSxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLFFBQ3RELFlBQVksUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxRQUNwRCxjQUFjLFFBQVEsa0NBQVcsdUJBQXVCO0FBQUEsUUFDeEQsY0FBYyxRQUFRLGtDQUFXLHVCQUF1QjtBQUFBLFFBQ3hELE9BQU8sUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxRQUMxQyxjQUFjLFFBQVEsa0NBQVcsdUJBQXVCO0FBQUEsUUFDeEQsWUFBWSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBLFFBQ3BELFVBQVUsUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQSxRQUNoRCxZQUFZLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsUUFDcEQsY0FBYyxRQUFRLGtDQUFXLHVCQUF1QjtBQUFBLE1BQzFEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDN0IsVUFBVSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxJQUMxQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
