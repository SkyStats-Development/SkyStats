# SkyStats Error Handling System

This document describes the new OOP-based error handling system implemented in SkyStats.

## Overview

The error handling system provides:
- **Structured Error Classes**: Type-safe error handling with specific error types
- **Global Error Handler**: Centralized error processing and logging
- **Redis Caching**: Integrated caching layer for API responses
- **Proper Error Propagation**: Errors bubble up through the application stack

## Error Classes

### Base Error
All application errors extend `BaseError`:
```typescript
import { BaseError } from './errors';

// Base properties available on all errors
error.statusCode    // HTTP status code
error.errorCode     // Application-specific error code
error.isOperational // Whether this is an expected operational error
error.message       // Human-readable error message
error.cause         // Optional underlying error that caused this one
```

### Specific Error Types

#### APIError
For external API failures (Hypixel, PlayerDB, etc.):
```typescript
import { APIError } from './errors';

throw new APIError('Failed to fetch player data', 'Hypixel');
```

#### DatabaseError
For MongoDB/database operations:
```typescript
import { DatabaseError } from './errors';

throw new DatabaseError('Failed to save player data');
```

#### CacheError
For Redis/caching operations:
```typescript
import { CacheError } from './errors';

throw new CacheError('Failed to retrieve cached data');
```

#### NotFoundError
For missing resources (players, profiles, etc.):
```typescript
import { NotFoundError } from './errors';

throw new NotFoundError('Player profile not found');
```

#### ValidationError
For invalid user input:
```typescript
import { ValidationError } from './errors';

throw new ValidationError('Invalid username format');
```

## Using the Error Handler

### In Services
```typescript
import { APIError, ErrorHandler } from './errors';

export async function getPlayerData(uuid: string) {
    try {
        const response = await axios.get(`https://api.hypixel.net/player/${uuid}`);
        return response.data;
    } catch (error) {
        throw new APIError('Failed to fetch player data', 'Hypixel', error);
    }
}
```

### In Commands
```typescript
import { APIError, DatabaseError, NotFoundError, ErrorHandler } from './errors';

export async function execute(interaction: ChatInputCommandInteraction) {
    try {
        const playerData = await getPlayerData(uuid);
        // ... handle success
    } catch (error) {
        // Handle specific error types
        if (error instanceof NotFoundError) {
            await interaction.editReply({ content: 'Player not found!' });
        } else if (error instanceof APIError) {
            await interaction.editReply({ content: 'API is currently unavailable' });
        } else {
            await interaction.editReply({ content: 'An unexpected error occurred' });
        }
        
        // Log the error
        const errorHandler = ErrorHandler.getInstance();
        await errorHandler.handleError(error as Error);
    }
}
```

## Redis Caching

### Cache Service
```typescript
import { CacheService, CacheKeys } from './services/CacheService';

const cache = CacheService.getInstance();

// Get cached data
const cachedPlayer = await cache.get<PlayerData>(CacheKeys.player(uuid));

// Set cached data with TTL
await cache.set(CacheKeys.player(uuid), playerData, 300); // 5 minutes

// Get or set pattern
const playerData = await cache.getOrSet(
    CacheKeys.player(uuid),
    () => fetchPlayerFromAPI(uuid),
    300
);
```

### Cache Keys
Pre-defined cache key builders:
```typescript
CacheKeys.player(uuid)          // player:uuid
CacheKeys.profile(profileId)    // profile:profileId
CacheKeys.networth(profileId)   // networth:profileId
CacheKeys.bazaar()              // bazaar:items
CacheKeys.guild(guildId)        // guild:guildId
CacheKeys.weight(profileId)     // weight:profileId
CacheKeys.museum(profileId)     // museum:profileId
```

## Migration Guide

### From Legacy Error Handling
**Old:**
```typescript
try {
    const result = await someOperation();
    return result;
} catch (error) {
    return { error: handleError(error) };
}
```

**New:**
```typescript
try {
    const result = await someOperation();
    return result;
} catch (error) {
    if (error instanceof SomeSpecificError) {
        throw error; // Re-throw structured errors
    }
    throw new APIError('Operation failed', 'ServiceName', error);
}
```

### From Manual Caching
**Old:**
```typescript
const cache = {};
const cacheKey = `player:${uuid}`;
if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < 300000) {
    return cache[cacheKey].data;
}
// ... fetch and cache
```

**New:**
```typescript
const cache = CacheService.getInstance();
const result = await cache.getOrSet(
    CacheKeys.player(uuid),
    () => fetchPlayerData(uuid),
    300
);
```

## Configuration

### Redis Configuration
```typescript
// In CacheService.ts
const redis = new Redis({
    host: '192.168.1.155',
    port: 6379,
    enableReadyCheck: true,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
});
```

### Cache TTL Configuration
```typescript
// In config/ConfigTypes.ts
export const DefaultCacheTTL = {
    player: 300,     // 5 minutes
    profile: 600,    // 10 minutes
    networth: 1800,  // 30 minutes
    bazaar: 60,      // 1 minute
    guild: 1800,     // 30 minutes
    weight: 1800,    // 30 minutes
    museum: 3600,    // 1 hour
} as const;
```

## TODO

- [ ] **Implement zod-based config validation** for type safety and runtime validation
- [ ] Add metrics collection for error rates and cache hit rates
- [ ] Implement circuit breaker pattern for external API calls
- [ ] Add structured logging with correlation IDs
- [ ] Create error recovery strategies for different error types
