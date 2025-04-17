provider "kubernetes" {
  config_path = var.kubeconfig_path
}

terraform {
  backend "kubernetes" {
    secret_suffix     = "jobstory-frontend-terraform-backend"
    config_path       = "~/.kube/config"
    namespace         = "terraform"
    config_context    = "gke_jobstory-456708_asia-southeast1-a_jobstory-cluster"
    in_cluster_config = false
  }
}

resource "kubernetes_namespace" "jobstory_fe" {
  metadata { name = "jobstory-frontend" }
}

resource "kubernetes_secret_v1" "ghcr" {
  metadata {
    name      = "ghcr-secret"
    namespace = kubernetes_namespace.jobstory_fe.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "ghcr.io" = {
          username = var.github_username
          password = var.github_token
          email    = var.github_email
          auth     = base64encode("${var.github_username}:${var.github_token}")
        }
      }
    })
  }
}

variable "github_username" {
  type        = string
  description = "GitHub username to pull images from GHCR"
  default     = "A"
}

variable "github_email" {
  type        = string
  description = "GitHub email to pull images from GHCR"
}

variable "github_token" {
  type        = string
  description = "GitHub access token to pull images from GHCR"
}

variable "kubeconfig_path" {
  type        = string
  default     = "~/.kube/config"
  description = "Path to the kubeconfig file."
}

