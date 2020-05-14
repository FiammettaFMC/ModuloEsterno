/**
 * Project: Predire in Grafana
 * File: Option.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-04-24
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Option interface for hierarchy base on the algortihm.
 */

export default interface Option {
    setValueFile(conf: string): void; // Parse the pretictor string info in the correct option 
}