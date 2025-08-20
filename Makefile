# image naming
FRONTEND_IMAGE = alphaleonis/risetunik-web
BACKEND_IMAGE  = alphaleonis/risetunik-server

# Tag default
TAG = latest

# Build image frontend
build-frontend:
	docker build -t $(FRONTEND_IMAGE):$(TAG) ./web

# Build image backend
build-backend:
	docker build -t $(BACKEND_IMAGE):$(TAG) ./server

# Build semua image sekaligus
build-all: build-frontend build-backend

# Tandai semua target ini sebagai phony
.PHONY: build-frontend build-backend build-all