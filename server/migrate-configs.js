require("dotenv").config()
const mongoose = require("mongoose")

// Load models
const Website = require("./models/Website")
const Config = require("./models/Config")

async function migrateConfigs() {
    try {
        console.log("Connecting to MongoDB...")
        // Ensure you have MONGO_URI in your .env file
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected!")

        console.log("Starting config migration...")

        // Since we removed 'config' from the schema, we must load it via 'strict: false'
        // or lean() to access the raw data that is still physically in the database.
        const websites = await mongoose.connection.collection("websites").find({}).toArray()
        
        console.log(`Found ${websites.length} total websites in database.`)
        
        let migratedCount = 0
        let skippedCount = 0

        for (const site of websites) {
            // Check if this website already has a Config document
            const existingConfig = await Config.findOne({ websiteId: site._id })
            
            if (!existingConfig) {
                // Determine the config data to migrate
                // If it had a nested config object in the DB, use it. Otherwise use empty object.
                const configDataToSave = site.config && typeof site.config === 'object' ? site.config : {}
                
                await Config.create({
                    websiteId: site._id,
                    data: configDataToSave
                })
                
                migratedCount++
                console.log(`[Migrated] Created new Config for website: ${site.name}`)
            } else {
                skippedCount++
                console.log(`[Skipped] Website ${site.name} already has a Config document.`)
            }
        }

        console.log("\n--- Migration Complete ---")
        console.log(`Total Migrated: ${migratedCount}`)
        console.log(`Total Skipped: ${skippedCount}`)

    } catch (error) {
        console.error("Migration Error:", error)
    } finally {
        await mongoose.disconnect()
        console.log("Disconnected from MongoDB.")
        process.exit()
    }
}

migrateConfigs()
