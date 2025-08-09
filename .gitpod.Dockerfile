FROM gitpod/workspace-full:latest

# Install latest Node.js (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - \
    && sudo apt-get install -y nodejs

# Install Prisma CLI
RUN npm install -g prisma
