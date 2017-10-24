/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import AdminSite from './AdminSite';

const SiteDomain = Model.define(
    'SiteDomain',
    {
        id: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV1,
            primaryKey: true,
        },       
        domain: {
            type: DataType.STRING(255),
        }
    },
    {
        indexes: [{ fields: ['domain'] }],
    },
);
SiteDomain.belongsTo(AdminSite);

export default SiteDomain;
