locals {
  rollout_ts = timestamp()
}

resource "kubernetes_deployment_v1" "frontend" {
  metadata {
    name      = "jobstory-frontend"
    namespace = kubernetes_namespace.jobstory_fe.metadata[0].name
    labels    = { app = "jobstory-frontend" }
  }

  spec {
    replicas = 1

    selector { match_labels = { app = "jobstory-frontend" } }

    template {
      metadata {
        labels = { app = "jobstory-frontend" }
        annotations = {
          "jobstory.ai/rollout-ts" = local.rollout_ts
        }
      }

      spec {
        container {
          name              = "frontend"
          image             = "ghcr.io/jobstoryai/frontend:latest"
          image_pull_policy = "Always"

          port { container_port = 3000 }

          command = ["/bin/sh", "-c"]
          args    = ["yarn build -- --no-lint && yarn start"]

          port {
            container_port = 3000
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 3000
            }
            initial_delay_seconds = 15
            period_seconds        = 10
            failure_threshold     = 3
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          env {
            name  = "NEXT_PUBLIC_BACKEND_URL"
            value = var.frontend_public_backend_url
          }

          env {
            name  = "SERVER_BACKEND_URL"
            value = var.frontend_server_backend_url
          }

          env {
            name  = "NEXT_PUBLIC_KEYCLOAK_URL"
            value = var.keycloak_url
          }

          env {
            name  = "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID"
            value = var.keycloak_client_id
          }

          env {
            name  = "NEXT_PUBLIC_KEYCLOAK_REALM"
            value = var.keycloak_realm
          }
        }

        image_pull_secrets { name = kubernetes_secret_v1.ghcr.metadata[0].name }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "jobstory-frontend"
    namespace = kubernetes_namespace.jobstory_fe.metadata[0].name
  }

  spec {
    selector = { app = "jobstory-frontend" }

    port {
      port        = 80
      target_port = 3000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_ingress_v1" "frontend_ingress" {
  metadata {
    name      = "frontend-ingress"
    namespace = kubernetes_namespace.jobstory_fe.metadata[0].name
    annotations = {
      "traefik.ingress.kubernetes.io/router.entrypoints"      = "websecure"
      "traefik.ingress.kubernetes.io/router.tls"              = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "cloudflare"
    }
  }

  spec {
    ingress_class_name = "traefik"

    rule {
      host = var.frontend_host

      http {
        path {
          path      = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service.frontend.metadata[0].name
              port { number = 80 }
            }
          }
        }
      }
    }

    tls { hosts = compact([var.frontend_host]) }
  }
}


variable "frontend_host" {
  type        = string
  description = "Ingress domain"
}

variable "frontend_public_backend_url" {
  type        = string
  description = "NextJS public backend URL"
}

variable "frontend_server_backend_url" {
  type        = string
  description = "NextJS server backend URL"
}

variable "keycloak_url" {
  type = string
}

variable "keycloak_client_id" {
  type = string
}

variable "keycloak_realm" {
  type = string
}
