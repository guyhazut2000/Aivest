FROM golang:1.23-alpine AS build

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /api-go .

FROM alpine:3.21
WORKDIR /app
COPY --from=build /api-go .
EXPOSE 8080
CMD ["./api-go"]
